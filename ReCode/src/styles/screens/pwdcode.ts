import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  viewStyles,
  textStyles,
  textInputTextStyles,
} from "../common";

interface PwdcodeViewStyles {
  container: ViewStyle;
  formContainer: ViewStyle;
  inputContainer: ViewStyle;
  botones: ViewStyle;
}

interface PwdcodeTextStyles {
  title: TextStyle;
  subtitle: TextStyle;
  inputText: TextStyle;
  inputCodigo: TextStyle;
}

const pwdcodeViewStyles = StyleSheet.create<PwdcodeViewStyles>({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  formContainer: {
    ...viewStyles.formContainer,
    width: "93%",
    borderRadius: borderRadius.xxxl,
  },
  inputContainer: {
    ...viewStyles.inputBaseContainer,
    marginTop: spacing.sm,
    height: 50,
  },
  botones: {
    ...viewStyles.buttonsContainer,
    marginTop: spacing.md,
  },
});

const pwdcodeTextStyles = StyleSheet.create<PwdcodeTextStyles>({
  title: {
    ...textStyles.title,
  },
  subtitle: {
    ...textStyles.subtitle,
  },
  inputText: {
    ...textInputTextStyles.inputText,
    color: colors.textPrimary,
  },
  inputCodigo: {
    fontSize: typography.fontSizes.xxxl,
    letterSpacing: 6,
    textAlign: "center",
    color: colors.textPrimary,
    fontFamily: typography.fontFamilies.sourceSansSemiBold,
  },
});

// Combined input styles for TextInput (using plain object to bypass ViewStyle/TextStyle conflict)
const pwdcodeInputStyles = {
  input: {
    ...viewStyles.inputBaseContainer,
    marginTop: spacing.sm,
    height: 50,
    ...textInputTextStyles.inputText,
    color: colors.textPrimary,
  },
  inputBloqueado: {
    ...viewStyles.inputBaseContainer,
    marginTop: spacing.sm,
    height: 50,
    ...textInputTextStyles.inputText,
    color: colors.textPrimary,
    opacity: 0.6,
  },
  inputCodigo: {
    ...viewStyles.inputBaseContainer,
    marginTop: spacing.sm,
    height: 50,
    ...textInputTextStyles.inputText,
    color: colors.textPrimary,
    fontSize: typography.fontSizes.xxxl,
    letterSpacing: 6,
    textAlign: "center",
    fontFamily: typography.fontFamilies.sourceSansSemiBold,
  },
} as const;

export const pwdcodeStyles = {
  ...pwdcodeViewStyles,
  ...pwdcodeTextStyles,
  ...pwdcodeInputStyles,
};