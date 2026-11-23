import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { PixelifySans_700Bold } from "@expo-google-fonts/pixelify-sans";
import {
  SourceSans3_400Regular,
  SourceSans3_600SemiBold,
} from "@expo-google-fonts/source-sans-3";
import { Inter_600SemiBold } from "@expo-google-fonts/inter";
import { SQLiteProvider } from "expo-sqlite";

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
    <SQLiteProvider
      // Expo copia assets/cliente.db solo si no existe una base con este nombre. Si cambias el
      // esquema o el banco de preguntas del asset, sube el número (v2 -> v3...) para que los
      // dispositivos reciban la copia nueva sin necesidad de migraciones.
      databaseName="cliente_v2.db"
      assetSource={{ assetId: require("../../assets/cliente.db") }}
    >
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0D0D14" },
        }}
      />
    </SQLiteProvider>
  );
}
