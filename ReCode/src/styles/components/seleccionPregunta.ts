import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import Constants from "expo-constants";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  viewStyles,
  textStyles,
  shadows,
} from "../common";

interface SeleccionViewStyles {
  container: ViewStyle;
  formContainer: ViewStyle;
  formActiva: ViewStyle;
  fila: ViewStyle;
  confirmButton: ViewStyle;
  confirmDisabled: ViewStyle;
}

interface SeleccionTextStyles {
  separator: TextStyle;
  sectionTitle: TextStyle;
  nivel: TextStyle;
  subtitle: TextStyle;
  confirmText: TextStyle;
  ayuda: TextStyle;
}

const seleccionViewStyles = StyleSheet.create<SeleccionViewStyles>({
  container: {
    ...viewStyles.containerCentered,
  },
  formContainer: {
    ...viewStyles.formContainerWide,
    marginBottom: spacing.md,
  },
  formActiva: {
    borderColor: colors.accentPurple,
    borderWidth: 2,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: colors.successBg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    width: "96%",
    alignItems: "center",
    marginBottom: Constants.statusBarHeight + spacing.xl,
    ...shadows.glowSuccess,
  },
  confirmDisabled: {
    opacity: 0.4,
  },
});

const seleccionTextStyles = StyleSheet.create<SeleccionTextStyles>({
  separator: {
    ...textStyles.separator,
    marginTop: spacing.lg,
    fontSize: typography.fontSizes.xxxl,
  },
  sectionTitle: {
    ...textStyles.sectionTitle,
  },
  nivel: {
    marginLeft: spacing.lg,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semiBold,
  },
  subtitle: {
    ...textStyles.subtitle,
  },
  confirmText: {
    fontSize: typography.fontSizes.xxxl,
    color: colors.textWhite,
    fontWeight: typography.fontWeights.bold,
  },
  ayuda: {
    ...textStyles.ayuda,
    textAlign: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
});

export const seleccionStyles = {
  ...seleccionViewStyles,
  ...seleccionTextStyles,
};