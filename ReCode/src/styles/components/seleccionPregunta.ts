import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const seleccionStyles = StyleSheet.create({
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
  ayuda: {
    color: "#8A8AA3",
    fontFamily: "SourceSans3_400Regular",
    fontSize: 16,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 22,
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
  formActiva: {
    borderColor: "#7C5CFF",
    borderWidth: 2,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
  },
  nivel: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    marginTop: 6,
    fontFamily: "SourceSans3_400Regular",
    fontSize: 18,
    lineHeight: 22,
    color: "#8A8AA3",
  },
  confirmButton: {
    backgroundColor: "#1c381f",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 20,
    width: "96%",
    alignItems: "center",
    marginBottom: Constants.statusBarHeight + 40,
  },
  confirmDisabled: {
    opacity: 0.4,
  },
  confirmText: {
    fontSize: 28,
    color: "white",
  },
});
