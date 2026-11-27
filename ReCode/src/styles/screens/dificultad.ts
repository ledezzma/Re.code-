import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  viewStyles,
  textStyles,
} from "../common";

interface DificultadViewStyles {
  container: ViewStyle;
  formContainer: ViewStyle;
  niveles: ViewStyle;
  nivel: ViewStyle;
  nivelActivo: ViewStyle;
  guardar: ViewStyle;
}

interface DificultadTextStyles {
  separator: TextStyle;
  sectionTitle: TextStyle;
  subtitle: TextStyle;
  nivelTexto: TextStyle;
  ayuda: TextStyle;
  aviso: TextStyle;
}

const dificultadViewStyles = StyleSheet.create<DificultadViewStyles>({
  container: {
    ...viewStyles.containerCentered,
  },
  formContainer: {
    ...viewStyles.formContainerWide,
    marginBottom: spacing.md,
  },
  niveles: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  nivel: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: "center",
    backgroundColor: colors.surfaceInput,
    borderRadius: borderRadius.md,
    borderColor: colors.borderPrimary,
    borderWidth: 1,
  },
  nivelActivo: {
    backgroundColor: "#1f1f31",
    borderColor: colors.accentPurple,
  },
  guardar: {
    width: "96%",
    marginBottom: spacing.statusBar + spacing.xl,
  },
});

const dificultadTextStyles = StyleSheet.create<DificultadTextStyles>({
  separator: {
    ...textStyles.separator,
    marginTop: spacing.lg,
    fontSize: typography.fontSizes.xxxl,
  },
  sectionTitle: {
    ...textStyles.sectionTitle,
  },
  subtitle: {
    ...textStyles.subtitle,
  },
  nivelTexto: {
    fontFamily: typography.fontFamilies.sourceSansSemiBold,
    fontSize: typography.fontSizes.md,
    color: colors.textSecondary,
  },
  ayuda: {
    ...textStyles.ayuda,
    textAlign: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  aviso: {
    color: colors.accentYellow,
  },
});

export const dificultadStyles = {
  ...dificultadViewStyles,
  ...dificultadTextStyles,
};