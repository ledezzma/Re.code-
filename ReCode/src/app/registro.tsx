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
import { useSQLiteContext } from "expo-sqlite";
import Constants from "expo-constants";
import Boton from "../components/Boton";
import Logo from "../components/Logo";
import { registrarUsuario } from "../database/users";
import * as SecureStore from "expo-secure-store";
import { getAPIUrl } from "../../utils/networkConnection";
import { registroStyles } from "../styles";

export default function Registro() {
  const router = useRouter();
  const db = useSQLiteContext();
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

    // 1. Registrar en BACKEND (source of truth)
    try {
      const API_URL = await getAPIUrl();
      const apiRes = await fetch(`${API_URL}/registrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: correo, password }),
      });

      if (!apiRes.ok) {
        const error = await apiRes.json();
        Alert.alert("Error", error.detail || "No se pudo crear la cuenta");
        return;
      }

      const apiData = await apiRes.json(); // { message, id_usuario }

      // 2. Guardar en LOCAL (cache para offline)
      try {
        const res = await registrarUsuario(db, correo, password);
        if (!res.ok) {
          console.warn("Cache local falló:", res.error);
        }
      } catch (e) {
        console.warn("Cache local falló:", e);
      }

      await SecureStore.setItemAsync("userId", String(apiData.id_usuario));
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
          <Pressable onPress={() => router.push("/login")}>
            <Text style={registroStyles.loginLink}> Inicia sesión</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}