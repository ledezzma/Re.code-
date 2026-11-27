import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  spacing,
  typography,
  viewStyles,
  textStyles,
} from "../common";

interface WelcomeViewStyles {
  container: ViewStyle;
  textBlock: ViewStyle;
  botones: ViewStyle;
}

interface WelcomeTextStyles {
  title: TextStyle;
  titleAccent: TextStyle;
  subtitle: TextStyle;
}

const welcomeViewStyles = StyleSheet.create<WelcomeViewStyles>({
  container: {
    ...viewStyles.containerCentered,
    paddingHorizontal: spacing.lg,
  },
  textBlock: {
    marginTop: spacing.statusBar + spacing.xl,
    alignItems: "center",
  },
  botones: {
    width: "80%",
    marginTop: spacing.xxxl,
    gap: spacing.xl,
  },
});

const welcomeTextStyles = StyleSheet.create<WelcomeTextStyles>({
  title: {
    ...textStyles.titleCentered,
    fontSize: typography.fontSizes.display,
  },
  titleAccent: {
    ...textStyles.logoAccent,
  },
  subtitle: {
    ...textStyles.subtitleCentered,
  },
});

export const welcomeStyles = {
  ...welcomeViewStyles,
  ...welcomeTextStyles,
};