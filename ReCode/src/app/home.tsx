import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Constants from 'expo-constants';
import Feather from '@expo/vector-icons/Feather';

export default function Home() {
  const router = useRouter();
  return (
    <LinearGradient colors={["#0C0C14", "#2f224b"]} style={styles.container}>
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
        <Text style={[styles.logoAccent, {fontSize: 24, marginTop: 20, textAlign:"center"}]}>Modos de Juego{"\n"}</Text>
        <Pressable style={styles.formContainer} onPress={() => router.push("/pregunta")}>
          <View style={[{flexDirection:"row"}]}>
            <Text style={[{color: "white", fontSize: 18}]}>Contrareloj</Text>
            <Text style={[{color: "#e2b544", marginTop: 3, marginLeft: 15, fontWeight: "condensed"}]}>VELOCIDAD{"\n"}</Text>
          </View>
          <Text style={[styles.subtitle]}>15 preguntas al azar, 30 segundos para cada una. Pon a prueba tus conocimientos</Text>
        </Pressable>

        <Pressable style={[styles.formContainer, {marginTop:18}]} onPress={() => router.push("/pregunta")}>
          <View style={[{flexDirection:"row"}]}>
            <Text style={[{color: "white", fontSize: 18}]}>Previsor</Text>
            <Text style={[{color: "#71ec66", marginTop: 3, marginLeft: 15}]}>CONTROL{"\n"}</Text>
          </View>
          <Text style={[styles.subtitle]}>10 preguntas, elige entre 3, conociendo el lenguaje y la dificultad</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  formContainer: {
    padding: 26,
    backgroundColor: '#1A1A28',
    width: "96%",
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
    fontSize: 18,
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
