import { useCallback, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import Feather from "@expo/vector-icons/Feather";
import Boton from "../components/Boton";
import NavBar from "../components/NavBar";
import { configStyles, viewStyles, textStyles } from "../styles";
import { MENSAJES_API, llamarAPI, mensajeDeError } from "../api/cliente";
import {
  exportarHistorial,
  importarHistorial,
  type RegistroNube,
} from "../database/historial";
import { cerrarSesion, eliminarUsuarioLocal, obtenerSesion, type Sesion } from "../database/usuarios";

type Operacion = "subir" | "bajar" | "eliminar" | null;

export default function Config() {
  const router = useRouter();
  const db = useSQLiteContext();
  const [sesion, setSesion] = useState<Sesion | null>(null);
  const [ocupado, setOcupado] = useState<Operacion>(null);

  // Se relee al entrar: la sesión puede haber cambiado desde otra pantalla
  useFocusEffect(
    useCallback(() => {
      let activo = true;
      obtenerSesion().then((s) => activo && setSesion(s));
      return () => {
        activo = false;
      };
    }, []),
  );

  // Hasta saber si hay sesión no se muestran botones, para no mostrar los equivocados
  const enCuenta = sesion !== null && !sesion.esInvitado;
  const esInvitado = sesion !== null && sesion.esInvitado;

  const cambiarPassword = () => {
    if (!sesion) return;
    router.push({
      pathname: "/pwdcode",
      params: sesion.correo ? { email: sesion.correo, origen: "config" } : { origen: "config" },
    });
  };

  const cerrar = () => {
    Alert.alert("Cerrar sesión", "¿Seguro que quieres salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: async () => {
          await cerrarSesion();
          router.replace("/login");
        },
      },
    ]);
  };

  // ---------- Cargar: local -> servidor ----------
  const cargarDatos = async () => {
    if (!sesion || ocupado) return;
    setOcupado("subir");
    try {
      const historial = await exportarHistorial(db, sesion.id);
      if (historial.length === 0) {
        Alert.alert("Sin datos", "Todavía no tienes historial en este dispositivo para cargar.");
        return;
      }
      const r = await llamarAPI(`/cargarHistorial/${sesion.id}`, { cuerpo: { historial } });
      if (!r.ok || r.data?.message !== MENSAJES_API.historialCargado) {
        Alert.alert("Error", mensajeDeError(r, "No se pudieron cargar los datos"));
        return;
      }
      Alert.alert("Listo", `Se enviaron ${historial.length} registros a tu cuenta.`);
    } catch (e) {
      Alert.alert("Error", e instanceof Error ? e.message : "No se pudieron cargar los datos");
    } finally {
      setOcupado(null);
    }
  };

  // ---------- Descargar: servidor -> local ----------
  const descargarDatos = async () => {
    if (!sesion || ocupado) return;
    setOcupado("bajar");
    try {
      const r = await llamarAPI<{ historial?: RegistroNube[]; message?: string }>(
        `/descargarHistorial/${sesion.id}`,
        { metodo: "GET" },
      );
      if (!r.ok || !Array.isArray(r.data?.historial)) {
        Alert.alert("Error", mensajeDeError(r, "No se pudieron descargar los datos"));
        return;
      }
      const nuevos = await importarHistorial(db, sesion.id, r.data.historial);
      Alert.alert(
        "Listo",
        nuevos === 0
          ? "Tu historial de este dispositivo ya estaba al día."
          : `Se agregaron ${nuevos} registros a este dispositivo.`,
      );
    } catch (e) {
      Alert.alert("Error", e instanceof Error ? e.message : "No se pudieron descargar los datos");
    } finally {
      setOcupado(null);
    }
  };

  // ---------- Eliminar cuenta ----------
  const eliminarCuenta = () => {
    if (!sesion) return;
    Alert.alert(
      "Eliminar cuenta",
      "Tu cuenta se desactivará y se borrarán de este dispositivo tu historial y tu configuración. Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            setOcupado("eliminar");
            try {
              const r = await llamarAPI(`/eliminarcuenta/${sesion.id}`);
              if (!r.ok || r.data?.message !== MENSAJES_API.cuentaEliminada) {
                Alert.alert("Error", mensajeDeError(r, "No se pudo eliminar la cuenta"));
                return;
              }
              await eliminarUsuarioLocal(db, sesion.id);
              router.replace("/");
              Alert.alert("Cuenta eliminada", "Tu cuenta se eliminó correctamente.");
            } catch (e) {
              Alert.alert("Error", e instanceof Error ? e.message : "No se pudo eliminar la cuenta");
            } finally {
              setOcupado(null);
            }
          },
        },
      ],
    );
  };

  return (
    <LinearGradient colors={["#0C0C14", "#2f224b"]} style={{ height: "100%", alignItems: "center" }}>
      <ScrollView
        style={configStyles.scroll}
        contentContainerStyle={configStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={configStyles.profileWrap}>
          <View style={configStyles.avatar}>
            <Feather name="user" size={56} color="#8A8AA3" />
          </View>
          <Text style={configStyles.email}>{sesion?.correo ?? "Invitado"}</Text>
          {esInvitado && (
            <Text style={configStyles.subtitle}>Inicia sesión para guardar tu progreso</Text>
          )}
        </View>

        {/* Sección común: Configura tus preguntas + Modos de Juego */}
        <View style={[viewStyles.cardElevated, { marginVertical: 20, padding: 20 }]}>
          <Pressable style={[{ flexDirection: "row", justifyContent: "space-between" }]} onPress={() => router.push("/")}>
            <Text style={configStyles.subtitle}>Configura tus preguntas</Text>
            <Feather name="arrow-right" size={24} color="#8A8AA3" />
          </Pressable>
        </View>

        <View>
          <Text style={configStyles.separator}>Modos de Juego{"\n"}</Text>

          <Pressable style={configStyles.formContainer} onPress={() => router.push("/pregunta")}>
            <View style={[{ flexDirection: "row" }]}>
              <Text style={textStyles.sectionTitle}>Contrarreloj</Text>
              <Text style={{ color: "#e7d512", fontSize: 14, fontWeight: "600", lineHeight: 20 }}>VELOCIDAD{"\n"}</Text>
            </View>
            <Text style={configStyles.subtitle}>15 preguntas al azar, 30 segundos para cada una. Pon a prueba tus conocimientos</Text>
          </Pressable>

          <Pressable style={configStyles.formContainer} onPress={() => router.push("/pregunta")}>
            <View style={[{ flexDirection: "row" }]}>
              <Text style={textStyles.sectionTitle}>Previsor</Text>
              <Text style={{ color: "#7C5CFF", fontSize: 14, fontWeight: "600", lineHeight: 20 }}>CONTROL{"\n"}</Text>
            </View>
            <Text style={configStyles.subtitle}>10 preguntas, elige entre 3, conociendo el lenguaje y la dificultad</Text>
          </Pressable>

          <Pressable style={configStyles.formContainer} onPress={() => router.push("/pregunta")}>
            <View style={[{ flexDirection: "row" }]}>
              <Text style={textStyles.sectionTitle}>Previsor</Text>
              <Text style={{ color: "#7C5CFF", fontSize: 14, fontWeight: "600", lineHeight: 20 }}>CONTROL{"\n"}</Text>
            </View>
            <Text style={configStyles.subtitle}>10 preguntas, elige entre 3, conociendo el lenguaje y la dificultad</Text>
          </Pressable>
        </View>

        {/* Sección para invitados: login/registro */}
        {esInvitado && (
          <View style={configStyles.formContainer}>
            <Text style={configStyles.separator}>Cuenta</Text>
            <View style={configStyles.buttons}>
              <Boton
                texto="Iniciar sesión"
                icono={<Feather name="log-in" size={22} color="white" />}
                onPress={() => router.push("/login")}
              />
              <Boton
                texto="Crear cuenta"
                variante="secundario"
                icono={<Feather name="user-plus" size={22} color="white" />}
                onPress={() => router.push("/registro")}
              />
            </View>
          </View>
        )}

        {/* Sección para usuarios logueados: cuenta + datos */}
        {enCuenta && (
          <>
            <View style={configStyles.formContainer}>
              <Text style={configStyles.separator}>Cuenta</Text>
              <View style={configStyles.buttons}>
                <Boton
                  texto="Cambiar contraseña"
                  icono={<Feather name="lock" size={22} color="white" />}
                  onPress={cambiarPassword}
                />
                <Boton
                  texto="Cerrar sesión"
                  variante="secundario"
                  icono={<Feather name="log-out" size={22} color="white" />}
                  onPress={cerrar}
                />
                <Boton
                  texto={ocupado === "eliminar" ? "Eliminando…" : "Eliminar cuenta"}
                  variante="peligro"
                  deshabilitado={ocupado !== null}
                  icono={<Feather name="trash-2" size={22} color="white" />}
                  onPress={eliminarCuenta}
                />
              </View>
            </View>

            <View style={configStyles.formContainer}>
              <Text style={configStyles.separator}>Datos</Text>
              <Text style={configStyles.ayuda}>
                Cargar envía tu historial de este dispositivo a tu cuenta. Descargar trae a este
                dispositivo el historial guardado en tu cuenta.
              </Text>
              <View style={configStyles.buttons}>
                <Boton
                  texto={ocupado === "subir" ? "Cargando…" : "Cargar datos"}
                  deshabilitado={ocupado !== null}
                  icono={<Feather name="upload-cloud" size={22} color="white" />}
                  onPress={cargarDatos}
                />
                <Boton
                  texto={ocupado === "bajar" ? "Descargando…" : "Descargar datos"}
                  variante="secundario"
                  deshabilitado={ocupado !== null}
                  icono={<Feather name="download-cloud" size={22} color="white" />}
                  onPress={descargarDatos}
                />
              </View>
            </View>
          </>
        )}

      </ScrollView>

      <NavBar pantallaActual="config" />
    </LinearGradient>
  );
}