import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface RegistroViewStyles {
  container: ViewStyle;
  formContainer: ViewStyle;
  inputContainer: ViewStyle;
  loginRow: ViewStyle;
}

interface RegistroTextStyles {
  title: TextStyle;
  subtitle: TextStyle;
  loginLink: TextStyle;
  inputText: TextStyle;
  input: TextStyle; // combined style for TextInput (original)
}

const registroViewStyles = StyleSheet.create<RegistroViewStyles>({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  formContainer: {
    padding: 28,
    backgroundColor: "#1A1A28",
    width: "93%",
    borderRadius: 40,
    borderColor: "#2c2c33",
    borderWidth: 1,
  },
  inputContainer: {
    marginVertical: 5,
    backgroundColor: "#13131E",
    marginBottom: 13,
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 12,
    borderColor: "#2c2c33",
    borderWidth: 1,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
});

const registroTextStyles = StyleSheet.create<RegistroTextStyles>({
  title: {
    fontFamily: "SourceSans3_600SemiBold",
    fontSize: 30,
    lineHeight: 44,
    color: "#F2F2F7",
  },
  subtitle: {
    marginTop: 2,
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
  inputText: {
    color: "#ababc0",
    fontSize: 16,
  },
  input: {
    marginVertical: 5,
    backgroundColor: "#13131E",
    color: "#ababc0",
    marginBottom: 13,
    borderRadius: 10,
    height: 45,
    fontSize: 16,
    paddingHorizontal: 12,
    borderColor: "#2c2c33",
    borderWidth: 1,
  },
});

export const registroStyles = {
  ...registroViewStyles,
  ...registroTextStyles,
};