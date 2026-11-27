import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { getAPIUrl } from "./networkConnection";

export interface AlertaCallbacks {
  showError: (title: string, message: string) => void;
  showSuccess: (title: string, message: string) => void;
}

export interface PushTokenData {
  token: string;
  platform: "ios" | "android" | "web";
  userId?: string;
}

const TOKEN_KEY = "expo_push_token";
const PERMISSION_KEY = "notification_permission_asked";

// Configuración global de cómo se muestran las notificaciones en foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Registra el dispositivo para push notifications:
 * - Pide permiso si no se ha pedido antes
 * - Obtiene el token de Expo
 * - Lo envía al backend para asociarlo al usuario
 */
export async function registerForPushNotificationsAsync(
  userId?: string,
  showAlerts = true,
  alerta?: AlertaCallbacks,
): Promise<string | null> {
  try {
    // 1. Verificar/pedir permisos
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowCriticalAlerts: true,
        },
        android: {
          allowAlert: true,
          allowSound: true,
          allowVibration: true,
        },
      });
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      if (showAlerts && alerta) {
        alerta.showError(
          "Permiso denegado",
          "Sin permiso no podrás recibir notificaciones",
        );
      }
      return null;
    }

    // ✅ Notificación local de bienvenida al conceder permiso
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "¡Listo!",
          body: "Sesión iniciada",
          sound: "default",
          data: { type: "welcome" },
        },
        trigger: {
          type: SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 1,
          repeats: false,
        },
      });
    } catch (e) {
      console.warn("No se pudo programar notificación de bienvenida:", e);
    }

    // 2. Obtener token de Expo
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: "29a61109-b590-4053-8cab-04104b3f166e", // Tu project ID de EAS
    });
    const token = tokenData.data;

    // Guardar localmente
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(PERMISSION_KEY, "true");

    // 3. Enviar token al backend
    if (userId) {
      await sendTokenToBackend({
        token,
        platform: Platform.OS as "ios" | "android",
        userId,
      });
    }

    if (showAlerts && alerta) {
      alerta.showSuccess("¡Listo!", "Recibirás notificaciones");
    }

    return token;
  } catch (error) {
    console.error("Error registrando push token:", error);
    if (showAlerts && alerta) {
      alerta.showError("Error", "No se pudo configurar notificaciones");
    }
    return null;
  }
}

/**
 * Envía el token al backend para asociarlo al usuario
 */
async function sendTokenToBackend(data: PushTokenData): Promise<boolean> {
  try {
    const API_URL = await getAPIUrl();
    const response = await fetch(`${API_URL}/guardar-token-push`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.warn("Backend error guardando token:", err);
      return false;
    }
    return true;
  } catch (error) {
    console.warn("No se pudo enviar token al backend:", error);
    return false;
  }
}

/**
 * Obtiene el token guardado localmente
 */
export async function getStoredPushToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

/**
 * Verifica si ya se pidió permiso
 */
export async function hasAskedPermission(): Promise<boolean> {
  const asked = await SecureStore.getItemAsync(PERMISSION_KEY);
  return asked === "true";
}

/**
 * Listener para cuando el usuario toca una notificación
 * Retorna función de cleanup
 */
export function addNotificationResponseListener(
  onResponse: (data: Record<string, unknown>) => void,
): () => void {
  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      const data = response.notification.request.content.data as Record<
        string,
        unknown
      >;
      onResponse(data);
    },
  );
  return () => subscription.remove();
}

/**
 * Listener para notificaciones recibidas en foreground
 */
export function addNotificationReceivedListener(
  onNotification: (notification: Notifications.Notification) => void,
): () => void {
  const subscription =
    Notifications.addNotificationReceivedListener(onNotification);
  return () => subscription.remove();
}

/**
 * Programa una notificación local (para testing)
 */
export async function scheduleLocalNotification(
  title: string,
  body: string,
  data?: Record<string, unknown>,
  secondsFromNow = 5,
): Promise<string> {
  return Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: data || {},
      sound: "default",
    },
    trigger: {
      type: SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: secondsFromNow,
      repeats: false,
    },
  });
}

/**
 * Cancela todas las notificaciones programadas
 */
export async function cancelAllScheduledNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
