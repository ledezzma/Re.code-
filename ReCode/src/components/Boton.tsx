// src/components/Boton.tsx
import { Pressable, Text, StyleSheet } from "react-native";
import { colores } from "@/constants/tema";

type Props = {
  titulo: string;
  onPress: () => void;
};

export default function Boton({ titulo, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: colores.primario,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  presionado: { opacity: 0.8 },
  texto: { color: "white", fontSize: 15, fontFamily: "Inter_600SemiBold" },
});
