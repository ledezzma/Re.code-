import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface BotonViewStyles {
  base: ViewStyle;
  primario: ViewStyle;
  secundario: ViewStyle;
  presionado: ViewStyle;
}

interface BotonTextStyles {
  texto: TextStyle;
}

const botonViewStyles = StyleSheet.create<BotonViewStyles>({
  base: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primario: {
    backgroundColor: "#7C5CFF",
    elevation: 20,
  },
  secundario: {
    backgroundColor: "#252247",
    borderWidth: 1,
  },
  presionado: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});

const botonTextStyles = StyleSheet.create<BotonTextStyles>({
  texto: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#FFFFFF",
  },
});

export const botonStyles = {
  ...botonViewStyles,
  ...botonTextStyles,
};