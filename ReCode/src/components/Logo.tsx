import { Text, StyleSheet } from "react-native";
import type { StyleProp, TextStyle } from "react-native";

type Props = {
  size?: number;
  marginTop?: number;
  style?: StyleProp<TextStyle>;
};

export default function Logo({ size = 65, marginTop = 0, style }: Props) {
  return (
    <Text style={[{ ...styles.logo, fontSize: size, marginTop }, style]}>
      Re<Text style={styles.logoAccent}>.code()</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontFamily: "PixelifySans_700Bold",
    letterSpacing: 1,
    color: "#D9D9DE",
  },
  logoAccent: {
    color: "#7C5CFF",
  },
});
