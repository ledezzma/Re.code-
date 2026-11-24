import { Text, View, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import NavBar from "../components/NavBar";
import { configStyles, viewStyles } from "../styles";

export default function Config() {
  const router = useRouter();
  return (
    <LinearGradient colors={["#0C0C14", "#2f224b"]} style={{ height: "100%" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={configStyles.container}
      >
        <View style={configStyles.logoWrap}>
          <Text style={configStyles.logo}>
            Re<Text style={configStyles.logoAccent}>.code()</Text>
          </Text>
        </View>

        <View style={[viewStyles.cardElevated, { marginVertical: 20, padding: 20 }]}>
          <Pressable style={[{ flexDirection: "row", justifyContent: "space-between" }]} onPress={() => router.push("/")}>
            <Text style={configStyles.subtitle}>Configura tus preguntas</Text>
            <Feather name="arrow-right" size={24} color="#8A8AA3" />
          </Pressable>
        </View>

        <View>
          <Text style={configStyles.separator}>Modos de Juego{"\n"}</Text>

          <Pressable style={configStyles.formContainer} onPress={() => router.push("/pregunta")}>
            <View style={[{ flexDirection: "row" }]}>
              <Text style={configStyles.sectionTitle}>Contrarreloj</Text>
              <Text style={configStyles.accentSpeed}>VELOCIDAD{"\n"}</Text>
            </View>
            <Text style={configStyles.subtitle}>15 preguntas al azar, 30 segundos para cada una. Pon a prueba tus conocimientos</Text>
          </Pressable>

          <Pressable style={configStyles.formContainer} onPress={() => router.push("/pregunta")}>
            <View style={[{ flexDirection: "row" }]}>
              <Text style={configStyles.sectionTitle}>Previsor</Text>
              <Text style={configStyles.accentControl}>CONTROL{"\n"}</Text>
            </View>
            <Text style={configStyles.subtitle}>10 preguntas, elige entre 3, conociendo el lenguaje y la dificultad</Text>
          </Pressable>

          <Pressable style={configStyles.formContainer} onPress={() => router.push("/pregunta")}>
            <View style={[{ flexDirection: "row" }]}>
              <Text style={configStyles.sectionTitle}>Previsor</Text>
              <Text style={configStyles.accentControl}>CONTROL{"\n"}</Text>
            </View>
            <Text style={configStyles.subtitle}>10 preguntas, elige entre 3, conociendo el lenguaje y la dificultad</Text>
          </Pressable>
        </View>
      </ScrollView>

      <NavBar pantallaActual="config" />
    </LinearGradient>
  );
}