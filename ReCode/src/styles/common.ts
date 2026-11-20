import { StyleSheet, ViewStyle, TextStyle } from "react-native";

/**
 * Common design tokens and shared styles
 * Centralized colors, spacing, typography, and reusable style objects
 */

// Color palette
export const colors = {
  // Background gradients
  gradientPrimary: ["#0C0C14", "#2f224b"],
  gradientSecondary: ["#0C0C14", "#1a1a2e"],
  gradientDark: ["#0C0C14", "#0C0C14"],

  // Surface colors
  surfacePrimary: "#1A1A28",
  surfaceSecondary: "#13111a",
  surfaceInput: "#13131E",
  surfaceDisabled: "#252247",

  // Border colors
  borderPrimary: "#2c2c33",
  borderSecondary: "#3a3a4a",
  borderInput: "#2c2c33",
  borderFocus: "#7C5CFF",

  // Text colors
  textPrimary: "#F2F2F7",
  textSecondary: "#8A8AA3",
  textMuted: "#6B6B7A",
  textPlaceholder: "#ababc0",
  textWhite: "#FFFFFF",

  // Accent colors
  accentPurple: "#7C5CFF",
  accentPurpleLight: "#8567ff",
  accentYellow: "#e7d512",
  accentGreen: "#67c767",
  accentGreenSuccess: "#35a62d",
  accentRed: "#a62d2d",

  // Status bar
  statusBarLight: "light",
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
};

// Border radius
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 30,
  round: 40,
};

// Typography - fontWeight values compatible with React Native TextStyle
export const typography = {
  fontFamilies: {
    pixelifyBold: "PixelifySans_700Bold",
    sourceSansRegular: "SourceSans3_400Regular",
    sourceSansSemiBold: "SourceSans3_600SemiBold",
    interSemiBold: "Inter_600SemiBold",
  },
  fontSizes: {
    xs: 11,
    sm: 13,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
    xxxl: 26,
    display: 39,
    logo: 50,
    title: 29,
    sectionTitle: 18,
  },
  lineHeights: {
    tight: 14,
    normal: 22,
    relaxed: 26,
    title: 44,
    question: 36,
  },
  fontWeights: {
    regular: "normal" as const,
    medium: "500" as const,
    semiBold: "600" as const,
    bold: "bold" as const,
  },
};

// Shadow presets
export const shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  large: {
    shadowColor: "#7C5CFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonPrimary: {
    elevation: 20,
  },
};

// Common VIEW styles (for View, ScrollView, Pressable, etc.)
export const viewStyles = StyleSheet.create({
  // Layout
  flex1: { flex: 1 } as ViewStyle,
  containerCentered: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  } as ViewStyle,
  scrollContent: {
    flexGrow: 1,
  } as ViewStyle,
  row: {
    flexDirection: "row",
  } as ViewStyle,
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  } as ViewStyle,
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,

  // Forms
  formContainer: {
    padding: spacing.lg,
    backgroundColor: colors.surfacePrimary,
    width: "93%",
    borderRadius: borderRadius.xxl,
    borderColor: colors.borderPrimary,
    borderWidth: 1,
  } as ViewStyle,
  formContainerWide: {
    padding: spacing.lg,
    backgroundColor: colors.surfacePrimary,
    width: "96%",
    borderRadius: borderRadius.xl,
    borderColor: colors.borderPrimary,
    borderWidth: 1,
    marginBottom: spacing.md,
    ...shadows.medium,
  } as ViewStyle,

  // Inputs (ViewStyle properties for TextInput container)
  inputBaseContainer: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    borderRadius: borderRadius.sm,
    height: 45,
    paddingHorizontal: spacing.md,
    borderColor: colors.borderInput,
    borderWidth: 1,
    backgroundColor: colors.surfaceInput,
  } as ViewStyle,

  // Buttons
  buttonBase: {
    width: "100%",
    height: 50,
    borderRadius: borderRadius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  } as ViewStyle,
  buttonPrimary: {
    backgroundColor: colors.accentPurple,
    ...shadows.buttonPrimary,
  } as ViewStyle,
  buttonSecondary: {
    backgroundColor: colors.surfaceDisabled,
    borderWidth: 1,
  } as ViewStyle,
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  } as ViewStyle,

  // Login/Register links
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.md,
  } as ViewStyle,

  // Buttons container
  buttonsContainer: {
    gap: spacing.sm,
    marginVertical: spacing.md,
  } as ViewStyle,
  buttonsContainerWide: {
    width: "80%",
    marginTop: spacing.xl,
    gap: spacing.xl,
  } as ViewStyle,
});

// TextInput text styles (TextStyle properties for TextInput text content)
export const textInputTextStyles = StyleSheet.create({
  inputText: {
    color: colors.textPlaceholder,
    fontSize: typography.fontSizes.lg,
    fontFamily: typography.fontFamilies.sourceSansRegular,
  } as TextStyle,
});

// Common TEXT styles (for Text components only)
export const textStyles = StyleSheet.create({
  // Text
  title: {
    fontFamily: typography.fontFamilies.sourceSansSemiBold,
    fontSize: typography.fontSizes.title,
    lineHeight: typography.lineHeights.title,
    color: colors.textPrimary,
  } as TextStyle,
  titleCentered: {
    fontFamily: typography.fontFamilies.sourceSansSemiBold,
    fontSize: typography.fontSizes.display,
    lineHeight: typography.lineHeights.title,
    textAlign: "center",
    color: colors.textPrimary,
  } as TextStyle,
  subtitle: {
    marginTop: spacing.xs,
    fontFamily: typography.fontFamilies.sourceSansRegular,
    fontSize: typography.fontSizes.lg,
    lineHeight: typography.lineHeights.normal,
    color: colors.textSecondary,
    maxWidth: 320,
  } as TextStyle,
  subtitleCentered: {
    marginTop: spacing.md,
    fontFamily: typography.fontFamilies.sourceSansRegular,
    fontSize: typography.fontSizes.lg,
    lineHeight: typography.lineHeights.normal,
    textAlign: "center",
    color: colors.textSecondary,
    maxWidth: 300,
  } as TextStyle,
  sectionTitle: {
    color: colors.textWhite,
    fontSize: typography.fontSizes.sectionTitle,
  } as TextStyle,
  sectionTitleSmall: {
    color: colors.textPrimary,
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semiBold,
  } as TextStyle,

  // Logo
  logo: {
    fontFamily: typography.fontFamilies.pixelifyBold,
    letterSpacing: 1,
    color: colors.textPrimary,
  } as TextStyle,
  logoAccent: {
    color: colors.accentPurple,
  } as TextStyle,

  // Separator
  separator: {
    color: colors.accentPurple,
    fontSize: typography.fontSizes.xxxl,
    fontWeight: typography.fontWeights.bold,
    marginTop: spacing.xxxl,
    marginBottom: spacing.lg,
    textAlign: "center",
    letterSpacing: 0.5,
  } as TextStyle,

  // Login/Register links
  loginLink: {
    color: colors.accentPurpleLight,
    fontSize: typography.fontSizes.lg,
    fontFamily: typography.fontFamilies.sourceSansRegular,
  } as TextStyle,

  // Button text
  buttonText: {
    fontFamily: typography.fontFamilies.interSemiBold,
    fontSize: typography.fontSizes.md,
    color: colors.textWhite,
  } as TextStyle,
});

// Combined styles for components that need both (use with caution)
export const commonStyles = {
  ...viewStyles,
  ...textStyles,
};