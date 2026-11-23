import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface HomeViewStyles {
  container: ViewStyle;
  logoWrap: ViewStyle;
  formContainer: ViewStyle;
}

interface HomeTextStyles {
  logo: TextStyle;
  logoAccent: TextStyle;
  separator: TextStyle;
  subtitle: TextStyle;
  sectionTitle: TextStyle;
  accentSpeed: TextStyle;
  accentControl: TextStyle;
}

const homeViewStyles = StyleSheet.create<HomeViewStyles>({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logoWrap: {
    marginTop: 48 + 40, // statusBarHeight + 40
    alignItems: "center",
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
});

const homeTextStyles = StyleSheet.create<HomeTextStyles>({
  logo: {
    fontFamily: "PixelifySans_700Bold",
    fontSize: 50,
    letterSpacing: 1,
    color: "#D9D9DE",
  },
  logoAccent: {
    color: "#7C5CFF",
  },
  separator: {
    color: "#7C5CFF",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: "SourceSans3_400Regular",
    fontSize: 18,
    lineHeight: 22,
    color: "#8A8AA3",
    maxWidth: 320,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
  },
  accentSpeed: {
    color: "#e2b544",
    marginTop: 3,
    marginLeft: 15,
    fontWeight: "condensed",
  },
  accentControl: {
    color: "#71ec66",
    marginTop: 3,
    marginLeft: 15,
  },
});

export const homeStyles = {
  ...homeViewStyles,
  ...homeTextStyles,
};