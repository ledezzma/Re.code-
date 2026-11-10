import { View, Pressable, StyleSheet, Text } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";

type Props = {
  pantallaActual: string;
};

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: "house", IconComp: FontAwesome6 },
  { key: "historial", label: "Historial", icon: "history", IconComp: AntDesign },
  { key: "config", label: "Config", icon: "gear", IconComp: FontAwesome6 },
] as const;

const ACTIVE_COLOR = "#7C5CFF";
const INACTIVE_COLOR = "#8A8AA3";
const BAR_BG = "#13111a";
const BORDER_COLOR = "#2c2c33";

export default function NavBar({ pantallaActual }: Props) {
  const router = useRouter();

  return (
    <View style={styles.navBar}>
      {NAV_ITEMS.map(({ key, label, icon, IconComp }) => {
        const isActive = pantallaActual === key;
        return (
          <Pressable
            key={key}
            style={({ pressed }) => [
              styles.navItem,
              isActive && styles.navItemActive,
              pressed && styles.navItemPressed,
            ]}
            onPress={() => router.push(`/${key}`)}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: isActive }}
          >
            <IconComp
              name={icon}
              size={22}
              color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
            />
            <Text
              style={[
                styles.navLabel,
                isActive ? styles.navLabelActive : styles.navLabelInactive,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: BAR_BG,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: BORDER_COLOR,
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
  navLabel: {
    fontFamily: "SourceSans3_600SemiBold",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 14,
    marginTop: 2,
  },
  navLabelActive: {
    color: ACTIVE_COLOR,
  },
  navLabelInactive: {
    color: INACTIVE_COLOR,
  },
  navItemPressed: {
    backgroundColor: "rgba(124, 92, 255, 0.06)",
  },
});