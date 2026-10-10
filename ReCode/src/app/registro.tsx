import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Constants from 'expo-constants';

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
        <Text style={styles.subtitle}>Únete a la plataforma Re.code(){"\n"}</Text>
        
        <Text style={styles.subtitle}>CORREO ELECTRÓNICO</Text>
        <TextInput style={styles.input} placeholder="tu@correo.com" placeholderTextColor={"#ababc0"}></TextInput>

        <Text style={styles.subtitle}>CONTRASEÑA</Text>
        <TextInput style={styles.input} placeholder="Mínimo 8 caracteres" placeholderTextColor={"#ababc0"} secureTextEntry={true}></TextInput>

        <Text style={styles.subtitle}>CONFIRMAR CONTRASEÑA</Text>
        <TextInput style={styles.input} placeholder="Repite tu contraseña" placeholderTextColor={"#ababc0"} secureTextEntry={true}></TextInput>

        <Pressable style={styles.button} onPress={() => router.push("/home")}>
          <Text style={styles.textBlock}>Crear cuenta</Text>
        </Pressable>

        <Text style={[styles.subtitle, {marginTop: 8, textAlign: "center"}]}>¿Ya tienes cuenta?
          <Pressable  onPress={() => router.push("/login")}>
            <Text style={[{color:"#8567ff", fontSize: 16, marginTop: 5.6}]}>  Inicia sesión</Text>
          </Pressable>
        </Text>

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
    marginTop: Constants.statusBarHeight + 100,
    marginBottom: 20
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
    fontSize: 30,
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
    marginVertical: 5,
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
