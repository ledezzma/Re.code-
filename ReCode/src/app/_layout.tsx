// src/app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Silkscreen_700Bold } from "@expo-google-fonts/silkscreen";
import { colores } from "@/constants/tema";

export default function Layout() {
  const [cargadas] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Silkscreen_700Bold,
  });

  if (!cargadas) return null; // espera a que carguen las fuentes

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colores.fondo },
        }}
      />
    </>
  );
}
