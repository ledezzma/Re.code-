import { StyleSheet, TextStyle } from "react-native";

interface LogoTextStyles {
  logo: TextStyle;
  logoAccent: TextStyle;
}

const logoTextStyles = StyleSheet.create<LogoTextStyles>({
  logo: {
    fontFamily: "PixelifySans_700Bold",
    letterSpacing: 1,
    color: "#D9D9DE",
  },
  logoAccent: {
    color: "#7C5CFF",
  },
});

export const logoStyles = logoTextStyles;