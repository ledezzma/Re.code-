import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface HistorialViewStyles {
  container: ViewStyle;
  formContainer: ViewStyle;
  headerRow: ViewStyle;
  headerLeft: ViewStyle;
  contenido: ViewStyle;
  paginacion: ViewStyle;
  paginaBoton: ViewStyle;
  paginaBotonOff: ViewStyle;
  vacio: ViewStyle;
}

interface HistorialTextStyles {
  separator: TextStyle;
  sectionTitle: TextStyle;
  dateText: TextStyle;
  questionText: TextStyle;
  nivelText: TextStyle;
  totalText: TextStyle;
  paginaTexto: TextStyle;
  vacioTexto: TextStyle;
}

const historialViewStyles = StyleSheet.create<HistorialViewStyles>({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    padding: 24,
    backgroundColor: "#1A1A28",
    width: "96%",
    borderRadius: 24,
    borderColor: "#2c2c33",
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  contenido: {
    alignItems: "center",
    paddingBottom: 120, // deja libre la barra de navegación inferior
  },
  paginacion: {
    width: "96%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  paginaBoton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#252247",
    borderWidth: 1,
    borderColor: "#2c2c33",
  },
  paginaBotonOff: {
    opacity: 0.35,
  },
  vacio: {
    width: "96%",
    padding: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#2c2c33",
    backgroundColor: "#1A1A28",
  },
});

const historialTextStyles = StyleSheet.create<HistorialTextStyles>({
  separator: {
    color: "#7C5CFF",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 100,
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },
  dateText: {
    color: "#6B6B7A",
    fontSize: 13,
    fontWeight: "500",
  },
  nivelText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 10,
  },
  totalText: {
    color: "#8A8AA3",
    fontSize: 15,
    textAlign: "center",
    marginTop: -12,
    marginBottom: 20,
  },
  paginaTexto: {
    color: "#F2F2F7",
    fontSize: 15,
    fontWeight: "600",
  },
  vacioTexto: {
    color: "#8A8AA3",
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  questionText: {
    color: "#E8E8ED",
    fontSize: 17,
    lineHeight: 26,
    fontWeight: "400",
    marginTop: 8,
  },
});

export const historialStyles = {
  ...historialViewStyles,
  ...historialTextStyles,
};