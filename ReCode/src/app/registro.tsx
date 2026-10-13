import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import Boton from "../components/Boton";

export default function Registro() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#0C0C14", "#0C0C14"]} style={styles.container}>
      <View style={styles.logoWrap}>
        <Text style={styles.logo}>
          Re<Text style={styles.logoAccent}>.code()</Text>
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Crea tu cuenta</Text>
        <Text style={styles.subtitle}>
          Únete a la plataforma Re.code(){"\n"}
        </Text>

        <Text style={styles.subtitle}>CORREO ELECTRÓNICO</Text>
        <TextInput
          style={styles.input}
          placeholder="tu@correo.com"
          placeholderTextColor={"#ababc0"}
        />

        <Text style={styles.subtitle}>CONTRASEÑA</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 8 caracteres"
          placeholderTextColor={"#ababc0"}
          secureTextEntry={true}
        />

        <Text style={styles.subtitle}>CONFIRMAR CONTRASEÑA</Text>
        <TextInput
          style={styles.input}
          placeholder="Repite tu contraseña"
          placeholderTextColor={"#ababc0"}
          secureTextEntry={true}
        />

        {/*Boton*/}
        <Boton texto="Crear Cuenta" onPress={() => router.push("/home")} />

        <View style={styles.loginRow}>
          <Text style={styles.subtitle}>¿Ya tienes cuenta?</Text>
          <Pressable onPress={() => router.push("/login")}>
            <Text style={styles.loginLink}> Inicia sesión</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 24,
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
    fontSize: 50,
    letterSpacing: 1,
    color: "#D9D9DE",
  },
  logoAccent: {
    color: "#7C5CFF",
  },
  title: {
    fontFamily: "SourceSans3_600SemiBold",
    fontSize: 30,
    lineHeight: 44,
    color: "#F2F2F7",
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
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "SourceSans3_600SemiBold",
    paddingVertical: 12,
  },
  input: {
    marginVertical: 5,
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
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  loginLink: {
    color: "#8567ff",
    fontSize: 16,
    fontFamily: "SourceSans3_400Regular",
  },
});
