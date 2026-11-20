import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Boton from "../components/Boton";
import Logo from "../components/Logo";
import Constants from "expo-constants";
import { welcomeStyles } from "../styles";

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <LinearGradient colors={["#0C0C14", "#0C0C14"]} style={welcomeStyles.container}>
      <Logo marginTop={Constants.statusBarHeight + 200} />
      <View style={welcomeStyles.textBlock}>
        <Text style={welcomeStyles.title}>
          Practica código{"\n"}
          <Text style={welcomeStyles.titleAccent}>como un juego</Text>
        </Text>

        <Text style={welcomeStyles.subtitle}>
          Evalúa tus conocimientos técnicos en rondas rápidas. Intenta, falla,
          aprende y vuelve a intentarlo.
        </Text>
      </View>

      <View style={welcomeStyles.botones}>
        {/*Inicio de sesion*/}
        <Boton
          texto="Iniciar Sesión"
          conFlecha
          onPress={() => router.push("/login")}
        />

        {/*Registro*/}
        <Boton
          texto="Crear Cuenta"
          variante="secundario"
          onPress={() => router.push("/registro")}
        />
      </View>
    </LinearGradient>
  );
}