import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import NavBar from "../components/NavBar";
import { nivelDe } from "../game/constantes";
import {
  REGISTROS_POR_PAGINA,
  contarHistorial,
  formatearFecha,
  obtenerHistorial,
  type RegistroHistorial,
} from "../database/historial";
import { obtenerSesion } from "../database/usuarios";
import { historialStyles } from "../styles";

export default function Historial() {
  const db = useSQLiteContext();
  const scrollRef = useRef<ScrollView>(null);
  const [pagina, setPagina] = useState(0); // empieza en 0
  const [total, setTotal] = useState(0);
  const [registros, setRegistros] = useState<RegistroHistorial[]>([]);
  const [cargando, setCargando] = useState(true);

  // Se recarga al entrar a la pantalla y al cambiar de página
  useFocusEffect(
    useCallback(() => {
      let activo = true;
      (async () => {
        const sesion = await obtenerSesion();
        const [n, filas] = await Promise.all([
          contarHistorial(db, sesion.id),
          obtenerHistorial(db, sesion.id, pagina),
        ]);
        if (!activo) return;
        if (filas.length === 0 && pagina > 0) {
          setPagina(0); // la página ya no existe
          return;
        }
        setTotal(n);
        setRegistros(filas);
        setCargando(false);
      })().catch((e) => {
        console.warn("No se pudo leer el historial:", e);
        if (activo) setCargando(false);
      });
      return () => {
        activo = false;
      };
    }, [db, pagina]),
  );

  const totalPaginas = Math.max(1, Math.ceil(total / REGISTROS_POR_PAGINA));

  const irAPagina = (nueva: number) => {
    setPagina(nueva);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const hayAnterior = pagina > 0;
  const haySiguiente = pagina + 1 < totalPaginas;

  return (
    <LinearGradient colors={["#0C0C14", "#2f224b"]} style={[{ height: "100%", alignItems: "center" }]}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        style={historialStyles.container}
        contentContainerStyle={historialStyles.contenido}
      >
        <Text style={historialStyles.separator}>Historial</Text>

        {cargando ? (
          <ActivityIndicator size="large" color="#7C5CFF" />
        ) : total === 0 ? (
          <View style={historialStyles.vacio}>
            <Text style={historialStyles.vacioTexto}>
              Aún no has respondido preguntas. Juega un modo desde el inicio y aparecerán aquí.
            </Text>
          </View>
        ) : (
          <>
            <Text style={historialStyles.totalText}>
              {total} {total === 1 ? "registro" : "registros"}
            </Text>

            {registros.map((r) => {
              const nivel = nivelDe(r.dificultad);
              return (
                <View key={r.id_registro} style={historialStyles.formContainer}>
                  <View style={historialStyles.headerRow}>
                    <View style={historialStyles.headerLeft}>
                      <Text style={historialStyles.sectionTitle}>Lenguaje: {r.lenguaje}</Text>
                      <Text style={historialStyles.dateText}>{formatearFecha(r.fecha)}</Text>
                      <Text style={[historialStyles.nivelText, { color: nivel.color }]}>{nivel.texto}</Text>
                    </View>
                    {r.correcta ? (
                      <AntDesign name="check" size={32} color="#35a62d" />
                    ) : (
                      <Feather name="x" size={34} color="#a62d2d" />
                    )}
                  </View>
                  <Text style={historialStyles.questionText}>{r.pregunta}</Text>
                </View>
              );
            })}

            <View style={historialStyles.paginacion}>
              <Pressable
                style={[historialStyles.paginaBoton, !hayAnterior && historialStyles.paginaBotonOff]}
                disabled={!hayAnterior}
                onPress={() => irAPagina(pagina - 1)}
                accessibilityRole="button"
                accessibilityLabel="Página anterior"
              >
                <Ionicons name="chevron-back" size={20} color="white" />
                <Text style={historialStyles.paginaTexto}>Anterior</Text>
              </Pressable>

              <Text style={historialStyles.paginaTexto}>
                {pagina + 1} / {totalPaginas}
              </Text>

              <Pressable
                style={[historialStyles.paginaBoton, !haySiguiente && historialStyles.paginaBotonOff]}
                disabled={!haySiguiente}
                onPress={() => irAPagina(pagina + 1)}
                accessibilityRole="button"
                accessibilityLabel="Página siguiente"
              >
                <Text style={historialStyles.paginaTexto}>Siguiente</Text>
                <Ionicons name="chevron-forward" size={20} color="white" />
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>

      <NavBar pantallaActual="historial" />
    </LinearGradient>
  );
}
