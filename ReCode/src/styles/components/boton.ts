import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  colors,
  typography,
  viewStyles,
} from "../common";

interface BotonViewStyles {
  base: ViewStyle;
  primario: ViewStyle;
  secundario: ViewStyle;
  peligro: ViewStyle;
  presionado: ViewStyle;
  deshabilitado: ViewStyle;
}

interface BotonTextStyles {
  texto: TextStyle;
}

const botonViewStyles = StyleSheet.create<BotonViewStyles>({
  base: {
    ...viewStyles.buttonBase,
  },
  primario: {
    ...viewStyles.buttonPrimary,
  },
  secundario: {
    ...viewStyles.buttonSecondary,
  },
  peligro: {
    ...viewStyles.buttonDanger,
  },
  presionado: {
    ...viewStyles.buttonPressed,
  },
  deshabilitado: {
    ...viewStyles.buttonDisabled,
  },
});

const botonTextStyles = StyleSheet.create<BotonTextStyles>({
  texto: {
    fontFamily: typography.fontFamilies.interSemiBold,
    fontSize: typography.fontSizes.md,
    color: colors.textWhite,
  },
});

export const botonStyles = {
  ...botonViewStyles,
  ...botonTextStyles,
};