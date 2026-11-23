import { StyleSheet } from "react-native";

export const pwdcodeStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  formContainer: {
    padding: 28,
    backgroundColor: "#1A1A28",
    width: "93%",
    borderRadius: 30,
    borderColor: "#2c2c33",
    borderWidth: 1,
  },
  title: {
    fontFamily: "SourceSans3_600SemiBold",
    fontSize: 29,
    lineHeight: 44,
    color: "#F2F2F7",
  },
  subtitle: {
    marginTop: 6,
    fontFamily: "SourceSans3_400Regular",
    fontSize: 16,
    lineHeight: 22,
    color: "#8A8AA3",
  },
  input: {
    marginTop: 6,
    backgroundColor: "#13131E",
    color: "#F2F2F7",
    marginBottom: 10,
    borderRadius: 10,
    height: 50,
    fontSize: 18,
    paddingHorizontal: 12,
    borderColor: "#2c2c33",
    borderWidth: 1,
  },
  inputBloqueado: {
    opacity: 0.6,
  },
  inputCodigo: {
    fontSize: 22,
    letterSpacing: 6,
    textAlign: "center",
  },
  botones: {
    gap: 8,
    marginTop: 12,
  },
});
