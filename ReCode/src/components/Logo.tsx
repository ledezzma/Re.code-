import { Text } from "react-native";
import type { StyleProp, TextStyle } from "react-native";
import { logoStyles } from "../styles";

type Props = {
  size?: number;
  marginTop?: number;
  style?: StyleProp<TextStyle>;
};

export default function Logo({ size = 65, marginTop = 0, style }: Props) {
  return (
    <Text style={[{ ...logoStyles.logo, fontSize: size, marginTop }, style]}>
      Re<Text style={logoStyles.logoAccent}>.code()</Text>
    </Text>
  );
}