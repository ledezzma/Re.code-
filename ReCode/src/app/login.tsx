import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import Zocial from "@expo/vector-icons/Zocial";
import Boton from "../components/Boton";
import Logo from "../components/Logo";
import * as SecureStore from "expo-secure-store";
import { getAPIUrl } from "../../utils/networkConnection";
import { registerForPushNotificationsAsync } from "../../utils/pushToken";
import { loginStyles } from "../styles";
import { useAlerta } from "../components/Alerta";

export default function Login() {
  const router = useRouter();
  const { showError, showSuccess } = useAlerta();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.includes("@") || !password) {
      showError("Campos incompletos", "Completa correo y contraseña");
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
        showError("Error de autenticación", err.detail || "Credenciales incorrectas");
        return;
      }

      const res = await response.json();
      await SecureStore.setItemAsync("userId", String(res.id_usuario));
      // Registrar push token con el userId y callbacks de alerta
      registerForPushNotificationsAsync(String(res.id_usuario), true, { showError, showSuccess });
      showSuccess("¡Bienvenido!", "Sesión iniciada correctamente");
      router.replace("/home");
    } catch {
      showError("Error de conexión", "No se pudo conectar al servidor");
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

        <View style={loginStyles.buttons}>
          <Boton texto="Iniciar sesión" onPress={handleLogin} />
          <Boton
            texto="Ingresar como invitado"
            variante="secundario"
            icono={<Zocial name="guest" size={24} color="white" />}
            onPress={() => router.push("/home")}
          />
        </View>

        <View style={loginStyles.loginRow}>
          <Text style={[loginStyles.subtitle, { marginTop: 0 }]}>
            ¿No tienes cuenta?
          </Text>
          <Pressable onPress={() => router.push("/registro")}>
            <Text style={loginStyles.loginLink}> Regístrate</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}