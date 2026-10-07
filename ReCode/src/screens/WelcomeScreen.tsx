import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={["#171526", "#0C0C14", "#0C0C14"]}
      style={styles.container}
    >
      <View style={styles.logoWrap}>
        <Text style={styles.logo}>
          Re<Text style={styles.logoAccent}>.code()</Text>
        </Text>
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>
          Practica código{"\n"}
          <Text style={styles.titleAccent}>como un juego</Text>
        </Text>

        <Text style={styles.subtitle}>
          Evalúa tus conocimientos técnicos en rondas rápidas. Compite, falla,
          aprende y vuelve a intentarlo
        </Text>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoWrap: {
    marginTop: 200,
  },
  logo: {
    fontFamily: "PixelifySans_700Bold",
    fontSize: 40,
    letterSpacing: 2,
    color: "#D9D9DE",
  },
  logoAccent: {
    color: "#7C5CFF",
  },
  textBlock: {
    marginTop: 64,
    alignItems: "center",
  },
  title: {
    fontFamily: "SourceSans3_600SemiBold",
    fontSize: 36,
    lineHeight: 44,
    textAlign: "center",
    color: "#F2F2F7",
  },
  titleAccent: {
    color: "#7C5CFF",
  },
  subtitle: {
    marginTop: 16,
    fontFamily: "SourceSans3_400Regular",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: "#8A8AA3",
    maxWidth: 320,
  },
});
