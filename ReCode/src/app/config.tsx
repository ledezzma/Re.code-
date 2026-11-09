import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationBar } from "expo-navigation-bar";
import { useRouter } from "expo-router";
import Constants from 'expo-constants';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import NavBar from "../components/NavBar";

export default function Home() {
  const router = useRouter();
  return (
    <LinearGradient colors={["#0C0C14", "#2f224b"]} style={[{height:"100%", alignItems:"center"}]}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>
            Re<Text style={styles.logoAccent}>.code()</Text>
          </Text>
        </View>

        <View style={[styles.formContainer, {marginVertical: 20, padding:20}]}>
          <Pressable style={[{flexDirection:"row", justifyContent:"space-between"}]} onPress={() => router.push("/")}>
            <Text style={styles.subtitle}>Configura tus preguntas</Text>
            <Feather name="arrow-right" size={24} color="#8A8AA3" />
          </Pressable>
        </View>

        <View>
          <Text style={styles.separator}>Modos de Juego{"\n"}</Text>

          <Pressable style={styles.formContainer} onPress={() => router.push("/pregunta")}>
            <View style={[{flexDirection:"row"}]}>
              <Text style={styles.sectionTitle}>Contrarreloj</Text>
              <Text style={[{color: "#e2b544", marginTop: 3, marginLeft: 15, fontWeight: "condensed"}]}>VELOCIDAD{"\n"}</Text>
            </View>
            <Text style={styles.subtitle}>15 preguntas al azar, 30 segundos para cada una. Pon a prueba tus conocimientos</Text>
          </Pressable>

          <Pressable style={styles.formContainer} onPress={() => router.push("/pregunta")}>
            <View style={[{flexDirection:"row"}]}>
              <Text style={styles.sectionTitle}>Previsor</Text>
              <Text style={[{color: "#71ec66", marginTop: 3, marginLeft: 15}]}>CONTROL{"\n"}</Text>
            </View>
            <Text style={styles.subtitle}>10 preguntas, elige entre 3, conociendo el lenguaje y la dificultad</Text>
          </Pressable>

          <Pressable style={styles.formContainer} onPress={() => router.push("/pregunta")}>
            <View style={[{flexDirection:"row"}]}>
              <Text style={styles.sectionTitle}>Previsor</Text>
              <Text style={[{color: "#71ec66", marginTop: 3, marginLeft: 15}]}>CONTROL{"\n"}</Text>
            </View>
            <Text style={styles.subtitle}>10 preguntas, elige entre 3, conociendo el lenguaje y la dificultad</Text>
          </Pressable>
        </View>
      </ScrollView>
      
      <NavBar pantallaActual = "config"></NavBar>
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
    borderWidth: 1,
    marginBottom: 18,
  },
  separator: {
    color: "#7C5CFF",
    fontSize: 24,
    marginTop: 20,
     textAlign:"center"
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logoWrap: {
    marginTop: Constants.statusBarHeight + 40,
    alignItems: "center"
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
  sectionTitle: {
    color: "white",
    fontSize: 18
  },
  titleAccent: {
    color: "#7C5CFF",
  },
  subtitle: {
    fontFamily: "SourceSans3_400Regular",
    fontSize: 18,
    lineHeight: 22,
    color: "#8A8AA3",
  }
});
