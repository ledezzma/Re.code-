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
import Boton from "../components/Boton";
import Logo from "../components/Logo";
import { getAPIUrl } from "../../utils/networkConnection";
import { registroStyles } from "../styles";

export default function Registro() {
  const router = useRouter();
  // estados para cada uno de los campos del registro
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const registrar = async () => {
    if (!correo.trim() || !password || !confirmar) {
      Alert.alert("Datos incompletos", "Llena todos los campos");
      return;
    }
    if (!correo.includes("@")) {
      Alert.alert("Correo invalido", "Revisa el formato de tu correo");
      return;
    }
    if (password.length < 8) {
      Alert.alert("La contraseña debe tener minimo 8 caracteres");
      return;
    }
    if (password !== confirmar) {
      Alert.alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const API_URL = await getAPIUrl();
      const apiRes = await fetch(`${API_URL}/registrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: correo, password }),
      });

      const apiData = await apiRes.json(); // { message, id_usuario }

      // La API responde 200 aunque el correo ya exista; en ese caso no trae id_usuario
      if (!apiRes.ok || !apiData.id_usuario) {
        Alert.alert("Error", apiData.detail || apiData.message || "No se pudo crear la cuenta");
        return;
      }

      // La sesión (y la fila local del usuario) se crean al iniciar sesión
      router.replace("/login");
    } catch {
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  };
  return (
    <LinearGradient colors={["#0C0C14", "#0C0C14"]} style={registroStyles.container}>
      <Logo
        marginTop={Constants.statusBarHeight + 100}
        style={{ marginBottom: 20 }}
      />
      <View style={registroStyles.formContainer}>
        <Text style={registroStyles.title}>Crea tu cuenta</Text>
        <Text style={registroStyles.subtitle}>
          Únete a la plataforma Re.code(){"\n"}
        </Text>

        <Text style={registroStyles.subtitle}>CORREO ELECTRÓNICO</Text>
        <TextInput
          style={registroStyles.input}
          placeholder="tu@correo.com"
          value={correo}
          onChangeText={setCorreo}
          autoCapitalize="none"
          placeholderTextColor={"#ababc0"}
        />

        <Text style={registroStyles.subtitle}>CONTRASEÑA</Text>
        <TextInput
          style={registroStyles.input}
          placeholder="Mínimo 8 caracteres"
          placeholderTextColor={"#ababc0"}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <Text style={registroStyles.subtitle}>CONFIRMAR CONTRASEÑA</Text>
        <TextInput
          style={registroStyles.input}
          placeholder="Repite tu contraseña"
          placeholderTextColor={"#ababc0"}
          secureTextEntry={true}
          value={confirmar}
          onChangeText={setConfirmar}
        />

        {/*Boton*/}
        <Boton texto="Crear Cuenta" onPress={registrar} />
        <View style={registroStyles.loginRow}>
          <Text style={registroStyles.subtitle}>¿Ya tienes cuenta?</Text>
          <Pressable onPress={() => router.replace("/login")}>
            <Text style={registroStyles.loginLink}> Inicia sesión</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}