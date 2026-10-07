import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { PixelifySans_700Bold } from "@expo-google-fonts/pixelify-sans";
import {
  SourceSans3_400Regular,
  SourceSans3_600SemiBold,
} from "@expo-google-fonts/source-sans-3";
import { Inter_600SemiBold } from "@expo-google-fonts/inter";

export default function RootLayout() {
  // lista de fuentes que se van a cargar
  const [fontsLoaded] = useFonts({
    PixelifySans_700Bold,
    SourceSans3_400Regular,
    SourceSans3_600SemiBold,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null; // si las fuentes no se han cargado, no renderiza nada

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "0D0D14" },
        }}
      />
    </>
  );
}
