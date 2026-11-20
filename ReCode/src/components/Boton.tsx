import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { botonStyles } from "../styles";

type Props = {
  texto: string;
  onPress: () => void;
  variante?: "primario" | "secundario";
  conFlecha?: boolean;
  icono?: ReactNode;
};

export default function Boton({
  texto,
  onPress,
  variante = "primario",
  conFlecha = false,
  icono,
}: Props) {
  const esPrimario = variante === "primario";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        botonStyles.base,
        esPrimario ? botonStyles.primario : botonStyles.secundario,
        pressed && botonStyles.presionado,
      ]}
    >
      {icono}
      <Text style={botonStyles.texto}>{texto}</Text>
      {conFlecha && <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />}
    </Pressable>
  );
}