import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  spacing,
  borderRadius,
  typography,
  viewStyles,
  textStyles,
  textInputTextStyles,
} from "../common";

interface LoginViewStyles {
  container: ViewStyle;
  formContainer: ViewStyle;
  inputContainer: ViewStyle;
  buttons: ViewStyle;
  loginRow: ViewStyle;
}

interface LoginTextStyles {
  title: TextStyle;
  subtitle: TextStyle;
  loginLink: TextStyle;
  olvido: TextStyle;
  inputText: TextStyle;
}

const loginViewStyles = StyleSheet.create<LoginViewStyles>({
  container: {
    ...viewStyles.containerCentered,
    paddingHorizontal: spacing.lg,
  },
  formContainer: {
    ...viewStyles.formContainer,
    width: "93%",
    borderRadius: borderRadius.xxxl,
  },
  inputContainer: {
    ...viewStyles.inputBaseContainer,
    marginTop: spacing.sm,
  },
  buttons: {
    ...viewStyles.buttonsContainer,
    marginVertical: spacing.sm,
  },
  loginRow: {
    ...viewStyles.loginRow,
    marginTop: spacing.xs,
  },
});

const loginTextStyles = StyleSheet.create<LoginTextStyles>({
  title: {
    ...textStyles.title,
  },
  subtitle: {
    ...textStyles.subtitle,
  },
  loginLink: {
    ...textStyles.loginLink,
  },
  olvido: {
    ...textStyles.loginLink,
    fontSize: typography.fontSizes.sm,
    alignSelf: "flex-end",
    paddingVertical: spacing.xs,
  },
  inputText: {
    ...textInputTextStyles.inputText,
  },
});

// Combined input style for TextInput (using plain object to bypass ViewStyle/TextStyle conflict)
const loginInputStyle = {
  input: {
    ...viewStyles.inputBaseContainer,
    marginTop: spacing.sm,
    ...textInputTextStyles.inputText,
  },
} as const;

export const loginStyles = {
  ...loginViewStyles,
  ...loginTextStyles,
  ...loginInputStyle,
};