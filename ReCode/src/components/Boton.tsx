import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  texto: string;
  onPress: () => void;
  variante?: "primario" | "secundario";
  conFlecha?: boolean;
};

export default function Boton({
  texto,
  onPress,
  variante = "primario",
  conFlecha = false,
}: Props) {
  const esPrimario = variante === "primario";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        esPrimario ? styles.primario : styles.secundario,
        pressed && styles.presionado,
      ]}
    >
      <Text style={styles.texto}>{texto}</Text>
      {conFlecha && <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  primario: {
    backgroundColor: "#7C5CFF",
    shadowColor: "#7C5CFF",
    shadowOpacity: 0.5,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  secundario: {
    backgroundColor: "#15132A",
    borderWidth: 1,
    borderColor: "#3A2F7A",
  },
  presionado: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  texto: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#FFFFFF",
  },
});
