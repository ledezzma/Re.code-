import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import Boton from "../components/Boton";
import Encabezado from "../components/Encabezado";
import { MENSAJES_API, llamarAPI, mensajeDeError } from "../api/cliente";
import { pwdcodeStyles as styles } from "../styles";

/**
 * Cambio de contraseña con código (API: /intentoCambiarPw y /cambiarcontrasena).
 *  Paso 1: se pide el correo y la API genera un token + un código.
 *  Paso 2: se escribe el código y la nueva contraseña.
 * Se llega desde "¿Olvidaste tu contraseña?" (login) o desde Configuración, que
 * pasa el correo de la cuenta y lo deja fijo.
 */
export default function CambiarContrasena() {
  const router = useRouter();
  const { email: emailParam, origen } = useLocalSearchParams<{ email?: string; origen?: string }>();
  const desdeConfig = origen === "config";
  const correoFijo = desdeConfig && !!emailParam;

  const [paso, setPaso] = useState<"correo" | "codigo">("correo");
  const [email, setEmail] = useState(emailParam ?? "");
  const [token, setToken] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [enviando, setEnviando] = useState(false);

  const pedirCodigo = async () => {
    const correo = email.trim().toLowerCase();
    if (!correo.includes("@")) {
      Alert.alert("Correo inválido", "Revisa el formato de tu correo");
      return;
    }
    setEnviando(true);
    try {
      const r = await llamarAPI<{ message: string; token: string }>("/intentoCambiarPw", {
        cuerpo: { email: correo },
      });
      if (!r.ok || !r.data?.token) {
        Alert.alert("Error", mensajeDeError(r, "No se pudo solicitar el código"));
        return;
      }
      setToken(r.data.token);
      setPaso("codigo");
    } catch (e) {
      Alert.alert("Error", e instanceof Error ? e.message : "No se pudo solicitar el código");
    } finally {
      setEnviando(false);
    }
  };

  const cambiar = async () => {
    if (!/^\d{1,6}$/.test(codigo.trim())) {
      Alert.alert("Código inválido", "Escribe el código numérico que recibiste");
      return;
    }
    if (nueva.length < 8) {
      Alert.alert("Contraseña débil", "La contraseña debe tener mínimo 8 caracteres");
      return;
    }
    if (nueva !== confirmar) {
      Alert.alert("Las contraseñas no coinciden");
      return;
    }
    setEnviando(true);
    try {
      const r = await llamarAPI("/cambiarcontrasena", {
        cuerpo: { token, codigo: codigo.trim(), nueva_contrasena: nueva },
      });
      // La API responde 200 con un mensaje también cuando el código no es válido
      if (!r.ok || r.data?.message !== MENSAJES_API.contrasenaActualizada) {
        Alert.alert("No se pudo cambiar", mensajeDeError(r, "Token o código inválido, o expirado"));
        return;
      }
      Alert.alert("Listo", "Tu contraseña se actualizó correctamente.");
      if (desdeConfig) router.back();
      else router.replace("/login");
    } catch (e) {
      Alert.alert("Error", e instanceof Error ? e.message : "No se pudo cambiar la contraseña");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <LinearGradient colors={["#0C0C14", "#0C0C14"]} style={{ flex: 1 }}>
      <Encabezado titulo="Cambiar contraseña" />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          {paso === "correo" ? (
            <>
              <Text style={styles.title}>Recupera tu acceso</Text>
              <Text style={styles.subtitle}>
                Escribe tu correo y te enviaremos un código para cambiar tu contraseña.
              </Text>

              <Text style={[styles.subtitle, { marginTop: 18 }]}>CORREO ELECTRÓNICO</Text>
              <TextInput
                style={[styles.input, correoFijo && styles.inputBloqueado]}
                placeholder="tu@correo.com"
                placeholderTextColor="#ababc0"
                value={email}
                onChangeText={setEmail}
                editable={!correoFijo}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />

              <View style={styles.botones}>
                <Boton texto="Enviar código" deshabilitado={enviando} onPress={pedirCodigo} />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.title}>Ingresa tu código</Text>
              <Text style={styles.subtitle}>
                Si la cuenta existe, se envió un código a {email.trim().toLowerCase()}. Vale por 15
                minutos y tienes 3 intentos.
              </Text>

              <Text style={[styles.subtitle, { marginTop: 18 }]}>CÓDIGO</Text>
              <TextInput
                style={[styles.input, styles.inputCodigo]}
                placeholder="123456"
                placeholderTextColor="#ababc0"
                value={codigo}
                onChangeText={(t) => setCodigo(t.replace(/\D/g, ""))}
                keyboardType="number-pad"
                maxLength={6}
                autoCorrect={false}
              />

              <Text style={styles.subtitle}>NUEVA CONTRASEÑA</Text>
              <TextInput
                style={styles.input}
                placeholder="Mínimo 8 caracteres"
                placeholderTextColor="#ababc0"
                secureTextEntry
                value={nueva}
                onChangeText={setNueva}
              />

              <Text style={styles.subtitle}>CONFIRMAR CONTRASEÑA</Text>
              <TextInput
                style={styles.input}
                placeholder="Repite tu contraseña"
                placeholderTextColor="#ababc0"
                secureTextEntry
                value={confirmar}
                onChangeText={setConfirmar}
              />

              <View style={styles.botones}>
                <Boton texto="Cambiar contraseña" deshabilitado={enviando} onPress={cambiar} />
                {!correoFijo && (
                  <Boton
                    texto="Usar otro correo"
                    variante="secundario"
                    onPress={() => setPaso("correo")}
                  />
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
