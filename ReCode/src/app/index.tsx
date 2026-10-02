// src/app/index.tsx
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import Boton from "@/components/Boton";
import { colores, espacio } from "@/constants/tema";

export default function Inicio() {
  return (
    <SafeAreaView style={styles.pantalla}>
      <View style={styles.logo}></View>

      <View style={styles.textos}>
        <Text style={styles.titulo}>Practica código</Text>
        <Text style={[styles.titulo, styles.destacado]}>como un juego</Text>
        <Text style={styles.subtitulo}>
          Evalúa tus conocimientos técnicos en rondas rápidas. Compite, falla,
          aprende y vuelve a intentarlo.
        </Text>
      </View>

      <View style={styles.botones}>
        <Boton titulo="Iniciar sesión" onPress={() => router.push("/login")} />
        <Boton titulo="Crear cuenta" onPress={() => router.push("/registro")} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
    paddingHorizontal: espacio.xl,
  },
  logo: { flex: 1, justifyContent: "flex-end" },
  textos: { flex: 1.2, justifyContent: "center", alignItems: "center" },
  titulo: {
    fontSize: 32,
    color: colores.titulo,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  destacado: { color: colores.primario },
  subtitulo: {
    marginTop: espacio.m,
    fontSize: 14,
    lineHeight: 22,
    color: colores.textoSuave,
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  botones: { gap: espacio.m, paddingBottom: espacio.l, paddingTop: espacio.xl },
});
