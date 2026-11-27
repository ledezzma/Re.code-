import { StyleSheet, TextStyle } from "react-native";
import {
  textStyles,
} from "../common";

interface LogoTextStyles {
  logo: TextStyle;
  logoAccent: TextStyle;
}

const logoTextStyles = StyleSheet.create<LogoTextStyles>({
  logo: {
    ...textStyles.logo,
  },
  logoAccent: {
    ...textStyles.logoAccent,
  },
});

export const logoStyles = logoTextStyles;