import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  colors,
  spacing,
  borderRadius,
  typography,
} from "../common";

interface NavBarViewStyles {
  navBar: ViewStyle;
  navItem: ViewStyle;
  navItemActive: ViewStyle;
  navItemPressed: ViewStyle;
}

interface NavBarTextStyles {
  navLabel: TextStyle;
  navLabelActive: TextStyle;
  navLabelInactive: TextStyle;
}

const navBarViewStyles = StyleSheet.create<NavBarViewStyles>({
  navBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: colors.surfaceSecondary,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderPrimary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: spacing.navbar,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    minWidth: 0,
  },
  navItemActive: {
    backgroundColor: `${colors.accentPurple}1A`, // 10% opacity
    borderRadius: borderRadius.md,
  },
  navItemPressed: {
    backgroundColor: `${colors.accentPurple}0F`, // 6% opacity
  },
});

const navBarTextStyles = StyleSheet.create<NavBarTextStyles>({
  navLabel: {
    fontFamily: typography.fontFamilies.sourceSansSemiBold,
    fontSize: typography.fontSizes.xs,
    textAlign: "center",
    lineHeight: typography.lineHeights.tight,
    marginTop: spacing.xs / 2,
  },
  navLabelActive: {
    color: colors.accentPurple,
  },
  navLabelInactive: {
    color: colors.textSecondary,
  },
});

export const navBarStyles = {
  ...navBarViewStyles,
  ...navBarTextStyles,
};