import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import Zocial from "@expo/vector-icons/Zocial";
import Boton from "../components/Boton";
import Logo from "../components/Logo";
import { useSQLiteContext } from "expo-sqlite";
import { getAPIUrl } from "../../utils/networkConnection";
import { cerrarSesion, guardarSesion } from "../database/usuarios";
import { loginStyles } from "../styles";

export default function Login() {
  const router = useRouter();
  const db = useSQLiteContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.includes("@") || !password) {
      Alert.alert("Error", "Completa correo y contraseña");
      return;
    }

    try {
      const API_URL = await getAPIUrl();
      console.log("API_URL:", API_URL);
      const response = await fetch(`${API_URL}/iniciarsesion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const err = await response.json();
        Alert.alert("Error", err.detail || "Credenciales incorrectas");
        return;
      }

      const res = await response.json();
      // guarda la sesión (id + correo) y crea la fila local del usuario con su configuración
      await guardarSesion(db, res.id_usuario, email);
      router.replace("/home");
    } catch {
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  };

  return (
    <LinearGradient colors={["#0C0C14", "#0C0C14"]} style={loginStyles.container}>
      <Logo
        marginTop={Constants.statusBarHeight + 100}
        style={{ marginBottom: 20 }}
      />
      <View style={loginStyles.formContainer}>
        <Text style={loginStyles.title}>Bienvenido de nuevo</Text>
        <Text style={loginStyles.subtitle}>Ingresa a tu cuenta para continuar</Text>

        <Text style={loginStyles.subtitle}>CORREO ELECTRÓNICO</Text>
        <TextInput
          style={loginStyles.input}
          placeholder="tu@correo.com"
          placeholderTextColor={"#ababc0"}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={loginStyles.subtitle}>CONTRASEÑA</Text>
        <TextInput
          style={loginStyles.input}
          placeholder="·····················"
          placeholderTextColor={"#ababc0"}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          onPress={() =>
            router.push({ pathname: "/pwdcode", params: email.includes("@") ? { email } : {} })
          }
          accessibilityRole="button"
        >
          <Text style={loginStyles.olvido}>¿Olvidaste tu contraseña?</Text>
        </Pressable>

        <View style={loginStyles.buttons}>
          <Boton texto="Iniciar sesión" onPress={handleLogin} />
          <Boton
            texto="Ingresar como invitado"
            variante="secundario"
            icono={<Zocial name="guest" size={24} color="white" />}
            onPress={async () => {
              await cerrarSesion(); // invitado: no debe quedar una sesión anterior activa
              router.replace("/home");
            }}
          />
        </View>

        <View style={loginStyles.loginRow}>
          <Text style={[loginStyles.subtitle, { marginTop: 0 }]}>
            ¿No tienes cuenta?
          </Text>
          <Pressable onPress={() => router.replace("/registro")}>
            <Text style={loginStyles.loginLink}> Regístrate</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}