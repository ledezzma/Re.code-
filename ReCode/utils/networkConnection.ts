import Constants from "expo-constants";
import * as Network from "expo-network";
import { Platform } from "react-native";

export async function getAPIUrl(): Promise<string> {
  // 1. Prioridad: variable de entorno (IP fija de la PC)
  const envUrl =
    Constants.expoConfig?.extra?.apiUrl || process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) return envUrl;

  // 2. Fallback: auto-detección (solo funciona si backend está en el mismo dispositivo)
  if (Platform.OS === "web") return "http://localhost:8001";
  const ip = await Network.getIpAddressAsync();
  return ip ? `http://${ip}:8001` : "http://localhost:8001";
}
