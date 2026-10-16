import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import Zocial from "@expo/vector-icons/Zocial";
import Boton from "../components/Boton";

export default function Login() {
  const router = useRouter();
  return (
    <LinearGradient colors={["#0C0C14", "#0C0C14"]} style={styles.container}>
      <View style={styles.logoWrap}>
        <Text style={styles.logo}>
          Re<Text style={styles.logoAccent}>.code()</Text>
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Bienvenido de nuevo</Text>
        <Text style={styles.subtitle}>
          Ingresa a tu cuenta para continuar{"\n"}
        </Text>

        <Text style={styles.subtitle}>CORREO ELECTRÓNICO</Text>
        <TextInput
          style={styles.input}
          placeholder="tu@correo.com"
          placeholderTextColor={"#ababc0"}
        ></TextInput>

        <Text style={styles.subtitle}>CONTRASEÑA</Text>
        <TextInput
          style={styles.input}
          placeholder="·····················"
          placeholderTextColor={"#ababc0"}
          secureTextEntry={true}
        ></TextInput>

        <View style={styles.buttons}>
          <Boton texto="Iniciar sesión" onPress={() => router.push("/home")} />
          <Boton
            texto="Ingresar como invitado"
            variante="secundario"
            icono={<Zocial name="guest" size={24} color="white" />}
            onPress={() => router.push("/home")}
          />
        </View>

        <View style={styles.loginRow}>
          <Text style={styles.subtitle}>¿No tienes cuenta?</Text>
          <Pressable onPress={() => router.push("/registro")}>
            <Text style={styles.loginLink}> Regístrate</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  formContainer: {
    padding: 28,
    backgroundColor: "#1A1A28",
    width: "93%",
    borderRadius: 30,
    borderColor: "#2c2c33",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoWrap: {
    marginTop: Constants.statusBarHeight + 100,
    marginBottom: 20,
  },
  logo: {
    fontFamily: "PixelifySans_700Bold",
    fontSize: 65,
    letterSpacing: 1,
    color: "#D9D9DE",
  },
  logoAccent: {
    color: "#7C5CFF",
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
  buttons: {
    gap: 8,
    marginVertical: 8,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
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
    borderWidth: 1,
  },
  loginLink: {
    color: "#8567ff",
    fontSize: 16,
    fontFamily: "SourceSans3_400Regular",
  },
});
