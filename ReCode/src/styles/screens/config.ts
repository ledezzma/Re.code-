import { StyleSheet } from "react-native";

// Pantalla de configuración / perfil (correo, cambiar contraseña, cerrar sesión).
// Nota: 48 = Constants.statusBarHeight aproximado, igual que en el resto de /styles.
export const configStyles = StyleSheet.create({
  scroll: {
    width: "100%",
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 120, // deja libre la barra de navegación inferior
  },
  profileWrap: {
    marginTop: 48 + 60,
    marginBottom: 30,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1A1A28",
    borderColor: "#7C5CFF",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  email: {
    fontFamily: "SourceSans3_600SemiBold",
    fontSize: 24,
    color: "#F2F2F7",
  },
  subtitle: {
    marginTop: 4,
    fontFamily: "SourceSans3_400Regular",
    fontSize: 16,
    lineHeight: 22,
    color: "#8A8AA3",
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
    fontFamily: "SourceSans3_400Regular",
    fontSize: 15,
    lineHeight: 21,
    color: "#8A8AA3",
    marginBottom: 14,
  },
  separator: {
    color: "#7C5CFF",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  buttons: {
    gap: 10,
  },
});
