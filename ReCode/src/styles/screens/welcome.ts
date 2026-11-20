import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface WelcomeViewStyles {
  container: ViewStyle;
  textBlock: ViewStyle;
  botones: ViewStyle;
}

interface WelcomeTextStyles {
  title: TextStyle;
  titleAccent: TextStyle;
  subtitle: TextStyle;
}

const welcomeViewStyles = StyleSheet.create<WelcomeViewStyles>({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  textBlock: {
    marginTop: 48,
    alignItems: "center",
  },
  botones: {
    width: "80%",
    marginTop: 40,
    gap: 25,
  },
});

const welcomeTextStyles = StyleSheet.create<WelcomeTextStyles>({
  title: {
    fontFamily: "SourceSans3_600SemiBold",
    fontSize: 39,
    lineHeight: 44,
    textAlign: "center",
    color: "#F2F2F7",
  },
  titleAccent: {
    color: "#7C5CFF",
  },
  subtitle: {
    marginTop: 16,
    fontFamily: "SourceSans3_400Regular",
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
    color: "#8A8AA3",
    maxWidth: 300,
  },
});

export const welcomeStyles = {
  ...welcomeViewStyles,
  ...welcomeTextStyles,
};