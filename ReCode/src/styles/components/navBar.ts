import { StyleSheet, ViewStyle, TextStyle } from "react-native";

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
    backgroundColor: "#13111a",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#2c2c33",
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 56,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    minWidth: 0,
  },
  navItemActive: {
    backgroundColor: "rgba(124, 92, 255, 0.1)",
    borderRadius: 12,
  },
  navItemPressed: {
    backgroundColor: "rgba(124, 92, 255, 0.06)",
  },
});

const navBarTextStyles = StyleSheet.create<NavBarTextStyles>({
  navLabel: {
    fontFamily: "SourceSans3_600SemiBold",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 14,
    marginTop: 2,
  },
  navLabelActive: {
    color: "#7C5CFF",
  },
  navLabelInactive: {
    color: "#8A8AA3",
  },
});

export const navBarStyles = {
  ...navBarViewStyles,
  ...navBarTextStyles,
};