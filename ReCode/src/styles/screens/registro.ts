import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  spacing,
  borderRadius,
  typography,
  viewStyles,
  textStyles,
  textInputTextStyles,
} from "../common";

interface RegistroViewStyles {
  container: ViewStyle;
  formContainer: ViewStyle;
  inputContainer: ViewStyle;
  loginRow: ViewStyle;
}

interface RegistroTextStyles {
  title: TextStyle;
  subtitle: TextStyle;
  loginLink: TextStyle;
  inputText: TextStyle;
}

const registroViewStyles = StyleSheet.create<RegistroViewStyles>({
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
    marginVertical: spacing.xs,
  },
  loginRow: {
    ...viewStyles.loginRow,
    marginTop: spacing.sm,
  },
});

const registroTextStyles = StyleSheet.create<RegistroTextStyles>({
  title: {
    ...textStyles.title,
    fontSize: typography.fontSizes.xxxl,
  },
  subtitle: {
    ...textStyles.subtitle,
  },
  loginLink: {
    ...textStyles.loginLink,
  },
  inputText: {
    ...textInputTextStyles.inputText,
  },
});

// Combined input style for TextInput (using plain object to bypass ViewStyle/TextStyle conflict)
const registroInputStyle = {
  input: {
    ...viewStyles.inputBaseContainer,
    marginVertical: spacing.xs,
    ...textInputTextStyles.inputText,
  },
} as const;

export const registroStyles = {
  ...registroViewStyles,
  ...registroTextStyles,
  ...registroInputStyle,
};