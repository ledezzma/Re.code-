import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import Constants from "expo-constants";
import {
  colors,
  spacing,
  typography,
} from "../common";

interface EncabezadoViewStyles {
  barra: ViewStyle;
  contenido: ViewStyle;
}

interface EncabezadoTextStyles {
  titulo: TextStyle;
}

const encabezadoViewStyles = StyleSheet.create<EncabezadoViewStyles>({
  barra: {
    width: "100%",
    height: Constants.statusBarHeight + 60,
    backgroundColor: colors.gradientPrimary[0],
    borderBottomWidth: 1,
    borderColor: colors.borderPrimary,
  },
  contenido: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
});

const encabezadoTextStyles = StyleSheet.create<EncabezadoTextStyles>({
  titulo: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.fontSizes.xl,
    marginLeft: spacing.sm,
    fontFamily: typography.fontFamilies.sourceSansSemiBold,
  },
});

export const encabezadoStyles = {
  ...encabezadoViewStyles,
  ...encabezadoTextStyles,
};