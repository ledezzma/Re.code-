import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import Boton from "../components/Boton";
import Encabezado from "../components/Encabezado";
import {
  LENGUAJES,
  NIVELES,
  alternarNivel,
  configPorDefecto,
  nivelActivo,
  type ConfigPreguntas,
  type Dificultad,
  type Lenguaje,
} from "../game/constantes";
import { guardarConfig, obtenerConfig, obtenerSesion, type Sesion } from "../database/usuarios";
import { dificultadStyles as styles } from "../styles";

/** Configuración de preguntas: dificultad por lenguaje, guardada en la tabla `usuario`. */
export default function ConfigurarDificultad() {
  const router = useRouter();
  const db = useSQLiteContext();
  const [sesion, setSesion] = useState<Sesion | null>(null);
  const [niveles, setNiveles] = useState<ConfigPreguntas>(configPorDefecto());
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    let activo = true;
    (async () => {
      const s = await obtenerSesion();
      const config = await obtenerConfig(db, s.id);
      if (!activo) return;
      setSesion(s);
      setNiveles(config);
    })().catch((e) => console.warn("No se pudo leer la configuración:", e));
    return () => {
      activo = false;
    };
  }, [db]);

  const alternar = (lenguaje: Lenguaje, nivel: Dificultad) =>
    setNiveles((prev) => ({ ...prev, [lenguaje]: alternarNivel(prev[lenguaje], nivel) }));

  const sinNiveles = LENGUAJES.every((l) => niveles[l] === 0);

  const guardar = async () => {
    if (!sesion) return;
    setGuardando(true);
    try {
      await guardarConfig(db, sesion, niveles);
      Alert.alert("Listo", "Dificultades guardadas");
      router.back();
    } catch {
      Alert.alert("Error", "No se pudieron guardar los cambios");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <LinearGradient colors={["#0C0C14", "#1a1a2e"]} style={{ flex: 1 }}>
      <Encabezado titulo="Dificultad" />

      {sesion === null ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#7C5CFF" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.separator}>Dificultad por lenguaje</Text>
            <Text style={styles.ayuda}>
              Activa uno o varios niveles por lenguaje. Un lenguaje sin niveles no tendrá preguntas.
            </Text>
            {sinNiveles && (
              <Text style={[styles.ayuda, styles.aviso]}>
                Ningún nivel activo: no podrás jugar hasta activar al menos uno.
              </Text>
            )}

            {LENGUAJES.map((lenguaje) => (
              <View key={lenguaje} style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Lenguaje: {lenguaje}</Text>
                <Text style={styles.subtitle}>Niveles de las preguntas</Text>

                <View style={styles.niveles}>
                  {NIVELES.map((n) => {
                    const activo = nivelActivo(niveles[lenguaje], n.id);
                    return (
                      <Pressable
                        key={n.id}
                        style={[styles.nivel, activo && styles.nivelActivo, activo && { borderColor: n.color }]}
                        onPress={() => alternar(lenguaje, n.id)}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: activo }}
                      >
                        <Text style={[styles.nivelTexto, activo && { color: n.color }]}>{n.texto}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ))}

            <View style={styles.guardar}>
              <Boton texto="Guardar cambios" onPress={guardar} deshabilitado={guardando} />
            </View>
          </View>
        </ScrollView>
      )}
    </LinearGradient>
  );
}
