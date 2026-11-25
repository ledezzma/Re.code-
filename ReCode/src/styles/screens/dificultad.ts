import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const dificultadStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  separator: {
    color: "#7C5CFF",
    fontSize: 24,
    marginTop: 20,
    textAlign: "center",
  },
  formContainer: {
    padding: 26,
    backgroundColor: "#1A1A28",
    width: "96%",
    borderRadius: 30,
    borderColor: "#2c2c33",
    borderWidth: 1,
    marginBottom: 18,
  },
  ayuda: {
    color: "#8A8AA3",
    fontFamily: "SourceSans3_400Regular",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 16,
  },
  aviso: {
    color: "#e2b544",
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
  },
  subtitle: {
    marginTop: 2,
    fontFamily: "SourceSans3_400Regular",
    fontSize: 16,
    lineHeight: 22,
    color: "#8A8AA3",
  },
  niveles: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  nivel: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#13131E",
    borderRadius: 14,
    borderColor: "#2c2c33",
    borderWidth: 1,
  },
  nivelActivo: {
    backgroundColor: "#1f1f31",
  },
  nivelTexto: {
    fontFamily: "SourceSans3_600SemiBold",
    fontSize: 16,
    color: "#8A8AA3",
  },
  guardar: {
    width: "96%",
    marginBottom: Constants.statusBarHeight + 40,
  },
});
