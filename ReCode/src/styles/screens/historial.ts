import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  viewStyles,
  textStyles,
} from "../common";

interface HistorialViewStyles {
  container: ViewStyle;
  formContainer: ViewStyle;
  headerRow: ViewStyle;
  headerLeft: ViewStyle;
  contenido: ViewStyle;
  paginacion: ViewStyle;
  paginaBoton: ViewStyle;
  paginaBotonOff: ViewStyle;
  vacio: ViewStyle;
}

interface HistorialTextStyles {
  separator: TextStyle;
  sectionTitle: TextStyle;
  dateText: TextStyle;
  questionText: TextStyle;
  nivelText: TextStyle;
  totalText: TextStyle;
  paginaTexto: TextStyle;
  vacioTexto: TextStyle;
}

const historialViewStyles = StyleSheet.create<HistorialViewStyles>({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  formContainer: {
    ...viewStyles.formContainerWide,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  contenido: {
    alignItems: "center",
    paddingBottom: spacing.navbar + spacing.xl,
  },
  paginacion: {
    width: "96%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  paginaBoton: {
    ...viewStyles.paginationButton,
  },
  paginaBotonOff: {
    ...viewStyles.paginationButtonOff,
  },
  vacio: {
    ...viewStyles.emptyState,
  },
});

const historialTextStyles = StyleSheet.create<HistorialTextStyles>({
  separator: {
    ...textStyles.separator,
    marginTop: spacing.xxxl + spacing.xl,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...textStyles.sectionTitle,
  },
  dateText: {
    ...textStyles.dateText,
  },
  nivelText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.semiBold,
    marginLeft: spacing.md,
  },
  totalText: {
    ...textStyles.totalText,
    marginTop: -spacing.md,
    marginBottom: spacing.lg,
  },
  paginaTexto: {
    ...textStyles.paginationText,
  },
  vacioTexto: {
    ...textStyles.emptyText,
  },
  questionText: {
    color: colors.textAnswer,
    fontSize: typography.fontSizes.md,
    lineHeight: typography.lineHeights.relaxed,
    fontWeight: typography.fontWeights.regular,
    marginTop: spacing.sm,
  },
});

export const historialStyles = {
  ...historialViewStyles,
  ...historialTextStyles,
};