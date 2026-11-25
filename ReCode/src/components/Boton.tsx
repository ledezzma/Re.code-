import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { botonStyles } from "../styles";

type Props = {
  texto: string;
  onPress: () => void;
  variante?: "primario" | "secundario" | "peligro";
  conFlecha?: boolean;
  icono?: ReactNode;
  deshabilitado?: boolean;
};

export default function Boton({
  texto,
  onPress,
  variante = "primario",
  conFlecha = false,
  icono,
  deshabilitado = false,
}: Props) {
  const estiloVariante = botonStyles[variante];

  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado}
      style={({ pressed }) => [
        botonStyles.base,
        estiloVariante,
        pressed && botonStyles.presionado,
        deshabilitado && botonStyles.deshabilitado,
      ]}
    >
      {icono}
      <Text style={botonStyles.texto}>{texto}</Text>
      {conFlecha && <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />}
    </Pressable>
  );
}