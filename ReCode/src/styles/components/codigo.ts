import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  colors,
  spacing,
  borderRadius,
  typography,
} from "../common";

/** Fuente monoespaciada (se carga en app/_layout.tsx) */
export const FUENTE_CODIGO = "JetBrainsMono_600SemiBold";
export const TAMANO_CODIGO = typography.fontSizes.sm;
/** Ancho aproximado de un carácter en la fuente monoespaciada (≈ 0.6 del tamaño) */
export const ANCHO_CARACTER = TAMANO_CODIGO * 0.6;

interface CodigoViewStyles {
  tarjeta: ViewStyle;
  fila: ViewStyle;
}

interface CodigoTextStyles {
  numero: TextStyle;
  linea: TextStyle;
}

const codigoViewStyles = StyleSheet.create<CodigoViewStyles>({
  tarjeta: {
    backgroundColor: colors.gradientPrimary[0],
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  fila: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

const codigoTextStyles = StyleSheet.create<CodigoTextStyles>({
  numero: {
    fontFamily: FUENTE_CODIGO,
    fontSize: TAMANO_CODIGO,
    lineHeight: 24,
    color: colors.textMuted,
    textAlign: "right",
    marginRight: spacing.md,
  },
  linea: {
    flex: 1,
    fontFamily: FUENTE_CODIGO,
    fontSize: TAMANO_CODIGO,
    lineHeight: 24,
    color: colors.textPrimary,
  },
});

export const codigoStyles = {
  ...codigoViewStyles,
  ...codigoTextStyles,
};