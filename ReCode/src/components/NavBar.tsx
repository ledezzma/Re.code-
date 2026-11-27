import { View, Pressable, Text } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { navBarStyles } from "../styles";
import { colors } from "../styles/common";

type Props = {
  pantallaActual: string;
};

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: "house", IconComp: FontAwesome6 },
  { key: "historial", label: "Historial", icon: "history", IconComp: AntDesign },
  { key: "config", label: "Config", icon: "gear", IconComp: FontAwesome6 },
] as const;

export default function NavBar({ pantallaActual }: Props) {
  const router = useRouter();

  return (
    <View style={navBarStyles.navBar}>
      {NAV_ITEMS.map(({ key, label, icon, IconComp }) => {
        const isActive = pantallaActual === key;
        return (
          <Pressable
            key={key}
            style={({ pressed }) => [
              navBarStyles.navItem,
              isActive && navBarStyles.navItemActive,
              pressed && navBarStyles.navItemPressed,
            ]}
            onPress={() => router.replace(`/${key}`)}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: isActive }}
          >
            <IconComp
              name={icon}
              size={22}
              color={isActive ? colors.accentPurple : colors.textSecondary}
            />
            <Text
              style={[
                navBarStyles.navLabel,
                isActive ? navBarStyles.navLabelActive : navBarStyles.navLabelInactive,
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