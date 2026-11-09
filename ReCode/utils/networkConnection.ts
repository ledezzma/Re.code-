import Constants from "expo-constants";
import * as Network from "expo-network";
import { Platform } from "react-native";

export async function getAPIUrl(): Promise<string> {

  const envUrl =
    Constants.expoConfig?.extra?.apiUrl || process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) return envUrl;

  if (Platform.OS === "web") return "http://localhost:8001";
  const ip = await Network.getIpAddressAsync();
  return ip ? `http://${ip}:8001` : "http://localhost:8001";
}
