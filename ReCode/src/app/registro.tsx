// src/app/registro.tsx
import { View, Text } from "react-native";
import { colores } from "@/constants/tema";

export default function Registro() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: colores.titulo }}>Registro</Text>
    </View>
  );
}
