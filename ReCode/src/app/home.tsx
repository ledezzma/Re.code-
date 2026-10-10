import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Constants from 'expo-constants';
import Feather from '@expo/vector-icons/Feather';

export default function Home() {
  const router = useRouter();
  return (
    <LinearGradient colors={["#0C0C14", "#0C0C14"]} style={styles.container}>
      <View style={styles.logoWrap}>
        <Text style={styles.logo}>
          Re<Text style={styles.logoAccent}>.code()</Text>
        </Text>
      </View>

      <View style={[styles.formContainer, {marginVertical: 20, padding:20}]}>
        <Pressable style={[styles.subtitle, {flexDirection:"row", justifyContent:"space-between"}]} onPress={() => router.push("/")}>
          <Text style={styles.subtitle}>Configura tus preguntas</Text>
          <Feather name="arrow-right" size={24} color="#8A8AA3" />
        </Pressable>
      </View>

      <View>
        <Text style={[styles.logoAccent, {fontSize: 20, marginTop: 20}]}>Modos de Juego</Text>
        
      </View>

    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  formContainer: {
    padding: 24,
    backgroundColor: '#1A1A28',
    width: "93%",
    borderRadius: 30,
    borderColor: "#2c2c33",
    borderWidth: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoWrap: {
    marginTop: Constants.statusBarHeight + 40,
  },
  logo: {
    fontFamily: "PixelifySans_700Bold",
    fontSize: 50,
    letterSpacing: 1,
    color: "#D9D9DE",
  },
  logoAccent: {
    color: "#7C5CFF",
  },
  textBlock: {
    margin: 10,
    fontSize: 16,
    color: "#fff",
  },
  title: {
    fontFamily: "SourceSans3_600SemiBold",
    fontSize: 29,
    lineHeight: 44,
    color: "#F2F2F7",
  },
  titleAccent: {
    color: "#7C5CFF",
  },
  subtitle: {
    marginTop: 2,
    fontFamily: "SourceSans3_400Regular",
    fontSize: 16,
    lineHeight: 22,
    color: "#8A8AA3",
    maxWidth: 320,
  },
  button: {
    marginVertical: 8,
    alignItems: "center",
    backgroundColor: "#8567ff",
    borderRadius: 10
  },

  input: {
    marginTop: 5,
    backgroundColor: "#13131E",
    color: "#ababc0",
    marginBottom: 10,
    borderRadius: 10,
    height: 45,
    fontSize: 16,
    paddingHorizontal: 12,
    borderColor: "#2c2c33",
    borderWidth: 1
  }
});
