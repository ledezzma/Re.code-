import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  colors,
  spacing,
  typography,
  viewStyles,
  textStyles,
} from "../common";

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
    paddingHorizontal: spacing.lg,
  },
  logoWrap: {
    marginTop: spacing.statusBar + spacing.xl,
    alignItems: "center",
  },
  formContainer: {
    ...viewStyles.formContainerWide,
    marginBottom: spacing.md,
  },
});

const homeTextStyles = StyleSheet.create<HomeTextStyles>({
  logo: {
    ...textStyles.logo,
    fontSize: typography.fontSizes.logo,
  },
  logoAccent: {
    ...textStyles.logoAccent,
  },
  separator: {
    ...textStyles.separator,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  subtitle: {
    ...textStyles.subtitle,
  },
  sectionTitle: {
    ...textStyles.sectionTitle,
  },
  accentSpeed: {
    color: colors.accentYellow,
    marginTop: spacing.xs,
    marginLeft: spacing.md,
    fontWeight: typography.fontWeights.semiBold,
  },
  accentControl: {
    color: colors.accentGreen,
    marginTop: spacing.xs,
    marginLeft: spacing.md,
  },
});

export const homeStyles = {
  ...homeViewStyles,
  ...homeTextStyles,
};