import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface LoginViewStyles {
  container: ViewStyle;
  formContainer: ViewStyle;
  inputContainer: ViewStyle;
  buttons: ViewStyle;
  loginRow: ViewStyle;
}

interface LoginTextStyles {
  title: TextStyle;
  subtitle: TextStyle;
  loginLink: TextStyle;
  olvido: TextStyle;
  inputText: TextStyle;
  input: TextStyle; // combined style for TextInput (original)
}

const loginViewStyles = StyleSheet.create<LoginViewStyles>({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  formContainer: {
    padding: 28,
    backgroundColor: "#1A1A28",
    width: "93%",
    borderRadius: 30,
    borderColor: "#2c2c33",
    borderWidth: 1,
  },
  inputContainer: {
    marginTop: 6,
    backgroundColor: "#13131E",
    marginBottom: 10,
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 12,
    borderColor: "#2c2c33",
    borderWidth: 1,
  },
  buttons: {
    gap: 8,
    marginVertical: 8,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
});

const loginTextStyles = StyleSheet.create<LoginTextStyles>({
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
    maxWidth: 320,
  },
  loginLink: {
    color: "#8567ff",
    fontSize: 16,
    fontFamily: "SourceSans3_400Regular",
  },
  olvido: {
    color: "#8567ff",
    fontSize: 15,
    fontFamily: "SourceSans3_400Regular",
    alignSelf: "flex-end",
    paddingVertical: 6,
  },
  inputText: {
    color: "#ababc0",
    fontSize: 16,
  },
  input: {
    marginTop: 6,
    backgroundColor: "#13131E",
    color: "#ababc0",
    marginBottom: 10,
    borderRadius: 10,
    height: 45,
    fontSize: 16,
    paddingHorizontal: 12,
    borderColor: "#2c2c33",
    borderWidth: 1,
  },
});

export const loginStyles = {
  ...loginViewStyles,
  ...loginTextStyles,
};