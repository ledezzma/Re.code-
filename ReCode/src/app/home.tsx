import { Text, View, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import NavBar from "../components/NavBar";
import { homeStyles, viewStyles } from "../styles";

export default function Home() {
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#0C0C14", "#2f224b"]}
      style={[{ height: "100%", alignItems: "center" }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={homeStyles.container}
      >
        <View style={homeStyles.logoWrap}>
          <Text style={homeStyles.logo}>
            Re<Text style={homeStyles.logoAccent}>.code()</Text>
          </Text>
        </View>

        <View
          style={[
            viewStyles.cardElevated,
            { marginVertical: 20, padding: 20 },
          ]}
        >
          <Pressable
            style={[{ flexDirection: "row", justifyContent: "space-between" }]}
            onPress={() => router.push("/")}
          >
            <Text style={homeStyles.subtitle}>Configura tus preguntas</Text>
            <Feather name="arrow-right" size={24} color="#8A8AA3" />
          </Pressable>
        </View>

        <View>
          <Text style={homeStyles.separator}>Modos de Juego{"\n"}</Text>

          <Pressable
            style={homeStyles.formContainer}
            onPress={() => router.push("/pregunta")}
          >
            <View style={[{ flexDirection: "row" }]}>
              <Text style={homeStyles.sectionTitle}>Contrarreloj</Text>
              <Text style={homeStyles.accentSpeed}>VELOCIDAD{"\n"}</Text>
            </View>
            <Text style={homeStyles.subtitle}>
              15 preguntas al azar, 30 segundos para cada una. Pon a prueba tus
              conocimientos
            </Text>
          </Pressable>

          <Pressable
            style={homeStyles.formContainer}
            onPress={() => router.push("/pregunta")}
          >
            <View style={[{ flexDirection: "row" }]}>
              <Text style={homeStyles.sectionTitle}>Previsor</Text>
              <Text style={homeStyles.accentControl}>CONTROL{"\n"}</Text>
            </View>
            <Text style={homeStyles.subtitle}>
              10 preguntas, elige entre 3, conociendo el lenguaje y la
              dificultad
            </Text>
          </Pressable>

          <View style={homeStyles.formContainer}>
            <Text style={homeStyles.subtitle}>
              Más modos de juego próximamente...
            </Text>
          </View>
        </View>
      </ScrollView>

      <NavBar pantallaActual="home" />
    </LinearGradient>
  );
}
