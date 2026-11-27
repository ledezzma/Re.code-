import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  colors,
  spacing,
  typography,
  viewStyles,
  textStyles,
  shadows,
} from "../common";

interface ConfigViewStyles {
  scroll: ViewStyle;
  container: ViewStyle;
  profileWrap: ViewStyle;
  avatar: ViewStyle;
  formContainer: ViewStyle;
  buttons: ViewStyle;
}

interface ConfigTextStyles {
  email: TextStyle;
  subtitle: TextStyle;
  separator: TextStyle;
  ayuda: TextStyle;
}

const configViewStyles = StyleSheet.create<ConfigViewStyles>({
  scroll: {
    width: "100%",
  },
  container: {
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.navbar + spacing.xl,
  },
  profileWrap: {
    marginTop: spacing.statusBar + spacing.xxxl,
    marginBottom: spacing.xl,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surfacePrimary,
    borderColor: colors.accentPurple,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  formContainer: {
    ...viewStyles.formContainerWide,
    marginBottom: spacing.md,
  },
  buttons: {
    ...viewStyles.buttonsContainer,
    gap: spacing.md,
  },
});

const configTextStyles = StyleSheet.create<ConfigTextStyles>({
  email: {
    fontFamily: typography.fontFamilies.sourceSansSemiBold,
    fontSize: typography.fontSizes.xl,
    color: colors.textPrimary,
  },
  subtitle: {
    ...textStyles.subtitle,
  },
  separator: {
    ...textStyles.separator,
    marginBottom: spacing.lg,
    marginTop: 0,
  },
  ayuda: {
    ...textStyles.ayuda,
  },
});

export const configStyles = {
  ...configViewStyles,
  ...configTextStyles,
};