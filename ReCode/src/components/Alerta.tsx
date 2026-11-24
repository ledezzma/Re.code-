import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { View, Text, Animated, Easing, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors, spacing, borderRadius, typography, shadows } from "../styles";

/** Alert types */
export type AlertType = "success" | "error" | "warning" | "info";

/** Alert configuration */
export interface AlertConfig {
  title: string;
  message?: string;
  type: AlertType;
  duration?: number; // ms, 0 = no auto-dismiss
  onDismiss?: () => void;
}

/** Context value for showing alerts */
interface AlertContextValue {
  showAlert: (config: AlertConfig) => void;
  showSuccess: (title: string, message?: string, duration?: number) => void;
  showError: (title: string, message?: string, duration?: number) => void;
  showWarning: (title: string, message?: string, duration?: number) => void;
  showInfo: (title: string, message?: string, duration?: number) => void;
}

const AlertContext = createContext<AlertContextValue | null>(null);

/** Hook to access alert functions */
export const useAlerta = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlerta must be used within an AlertaProvider");
  }
  return context;
};

/** Individual Alert Toast Component */
interface AlertToastProps {
  config: AlertConfig;
  visible: boolean;
  onAnimationEnd: (visible: boolean) => void;
}

interface AlertTypeStyle {
  gradient: readonly [string, string];
  borderColor: string;
  icon: string;
  IconComp: React.ComponentType<any>;
  iconColor: string;
  titleColor: string;
}

const AlertToast: React.FC<AlertToastProps> = ({ config, visible, onAnimationEnd }) => {
  const { title, message, type } = config;

  // eslint-disable-next-line react-hooks/refs -- Animated.Value refs are accessed via .current for React Native Animated
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  // eslint-disable-next-line react-hooks/refs -- Animated.Value refs are accessed via .current for React Native Animated
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  const typeStyles: Record<AlertType, AlertTypeStyle> = {
    success: {
      gradient: ["#1a3a2e", "#0d2818"] as const,
      borderColor: "#35a62d",
      icon: "check-circle",
      IconComp: AntDesign,
      iconColor: "#67c767",
      titleColor: "#67c767",
    },
    error: {
      gradient: ["#3a1a1a", "#280d0d"] as const,
      borderColor: "#a62d2d",
      icon: "close-circle",
      IconComp: AntDesign,
      iconColor: "#a62d2d",
      titleColor: "#a62d2d",
    },
    warning: {
      gradient: ["#3a3a1a", "#28280d"] as const,
      borderColor: "#e7d512",
      icon: "warning",
      IconComp: Ionicons,
      iconColor: "#e7d512",
      titleColor: "#e7d512",
    },
    info: {
      gradient: ["#1a2a3a", "#0d1828"] as const,
      borderColor: "#7C5CFF",
      icon: "information-circle",
      IconComp: Ionicons,
      iconColor: "#7C5CFF",
      titleColor: "#7C5CFF",
    },
  };

  const style = typeStyles[type];

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 250,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) onAnimationEnd(false);
      });
    }
  // eslint-disable-next-line react-hooks/refs -- Animated.Value refs used in dependency array for React Native Animated
  }, [visible, fadeAnim, slideAnim, onAnimationEnd]);

  return (
    <Animated.View
      // eslint-disable-next-line react-hooks/refs -- Animated.Value refs used directly in style for React Native Animated
      style={[
        styles.toastContainer,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }, // eslint-disable-line react-hooks/refs -- Animated.Value refs used directly in style for React Native Animated
      ]}
    >
      <LinearGradient
        colors={style.gradient}
        style={[
          styles.toastGradient,
          { borderColor: style.borderColor },
        ]}
      >
        <View style={styles.toastContent}>
          <View style={styles.iconWrapper}>
            <style.IconComp name={style.icon} size={24} color={style.iconColor} />
          </View>
          <View style={styles.textWrapper}>
            <Text
              style={[
                styles.toastTitle,
                { color: style.titleColor },
              ]}
            >
              {title}
            </Text>
            {message && (
              <Text style={styles.toastMessage}>{message}</Text>
            )}
          </View>
        </View>
      </LinearGradient>
      {/* Subtle glow effect */}
      <View
        style={[
          styles.glow,
          { backgroundColor: style.iconColor },
        ]}
      />
    </Animated.View>
  );
};

/** Alert Provider - wraps the app and manages toast queue */
interface AlertaProviderProps {
  children: ReactNode;
}

export const AlertaProvider: React.FC<AlertaProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<(AlertConfig & { id: number })[]>([]);
  const idCounter = React.useRef(0);

  const dismissAlert = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showAlert = useCallback((config: AlertConfig) => {
    const id = ++idCounter.current;
    const newToast = { ...config, id };
    const duration = config.duration ?? 4000;

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        dismissAlert(id);
      }, duration);
    }
  }, [dismissAlert]);

  const handleAnimationEnd = useCallback((id: number, visible: boolean) => {
    if (!visible) {
      dismissAlert(id);
    }
  }, [dismissAlert]);

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        showSuccess: (title, message, duration) =>
          showAlert({ title, message, type: "success", duration }),
        showError: (title, message, duration) =>
          showAlert({ title, message, type: "error", duration }),
        showWarning: (title, message, duration) =>
          showAlert({ title, message, type: "warning", duration }),
        showInfo: (title, message, duration) =>
          showAlert({ title, message, type: "info", duration }),
      }}
    >
      {children}
      {/* Toast Container - positioned at top */}
      <View style={styles.toastStack} pointerEvents="none">
        {toasts.map((toast) => (
          <View
            key={toast.id}
            style={styles.toastWrapper}
            pointerEvents="auto"
          >
            <AlertToast
              config={toast}
              visible={true}
              onAnimationEnd={(vis) => handleAnimationEnd(toast.id, vis)}
            />
          </View>
        ))}
      </View>
    </AlertContext.Provider>
  );
};

/** Inline Alert Component - for use within screens (non-toast) */
export interface InlineAlertProps {
  title: string;
  message?: string;
  type: AlertType;
  onDismiss?: () => void;
  showIcon?: boolean;
}

export const InlineAlert: React.FC<InlineAlertProps> = ({
  title,
  message,
  type,
  onDismiss,
  showIcon = true,
}) => {
  const [visible, setVisible] = useState(true);

  const typeStyles: Record<AlertType, AlertTypeStyle> = {
    success: {
      gradient: ["#1a3a2e", "#0d2818"] as const,
      borderColor: "#35a62d",
      icon: "check-circle",
      IconComp: AntDesign,
      iconColor: "#67c767",
      titleColor: "#67c767",
    },
    error: {
      gradient: ["#3a1a1a", "#280d0d"] as const,
      borderColor: "#a62d2d",
      icon: "close-circle",
      IconComp: AntDesign,
      iconColor: "#a62d2d",
      titleColor: "#a62d2d",
    },
    warning: {
      gradient: ["#3a3a1a", "#28280d"] as const,
      borderColor: "#e7d512",
      icon: "warning",
      IconComp: Ionicons,
      iconColor: "#e7d512",
      titleColor: "#e7d512",
    },
    info: {
      gradient: ["#1a2a3a", "#0d1828"] as const,
      borderColor: "#7C5CFF",
      icon: "information-circle",
      IconComp: Ionicons,
      iconColor: "#7C5CFF",
      titleColor: "#7C5CFF",
    },
  };

  const style = typeStyles[type];

  if (!visible) return null;

  return (
    <LinearGradient
      colors={style.gradient}
      style={[
        styles.inlineContainer,
        { borderColor: style.borderColor },
      ]}
    >
      <View style={styles.inlineContent}>
        {showIcon && (
          <View style={styles.inlineIconWrapper}>
            <style.IconComp name={style.icon} size={20} color={style.iconColor} />
          </View>
        )}
        <View style={styles.inlineTextWrapper}>
          <Text
            style={[
              styles.inlineTitle,
              { color: style.titleColor },
            ]}
          >
            {title}
          </Text>
          {message && (
            <Text style={styles.inlineMessage}>{message}</Text>
          )}
        </View>
        {onDismiss && (
          <Pressable onPress={() => setVisible(false)} style={styles.dismissButton}>
            <Ionicons name="close" size={20} color={colors.textMuted} />
          </Pressable>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // Toast styles
  toastStack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 60, // Below status bar
    paddingHorizontal: spacing.lg,
    zIndex: 9999,
  },
  toastWrapper: {
    marginBottom: spacing.sm,
  },
  toastContainer: {
    borderRadius: borderRadius.lg,
    overflow: "hidden",
  },
  toastGradient: {
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.medium,
  },
  toastContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  iconWrapper: {
    marginTop: 2,
  },
  textWrapper: {
    flex: 1,
  },
  toastTitle: {
    fontFamily: typography.fontFamilies.sourceSansSemiBold,
    fontSize: typography.fontSizes.md,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  toastMessage: {
    fontFamily: typography.fontFamilies.sourceSansRegular,
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.normal,
  },
  glow: {
    position: "absolute",
    bottom: -4,
    left: spacing.md,
    right: spacing.md,
    height: 8,
    borderRadius: borderRadius.lg,
    opacity: 0.15,
  },

  // Inline alert styles
  inlineContainer: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.sm,
    ...shadows.small,
  },
  inlineContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  inlineIconWrapper: {
    marginTop: 2,
  },
  inlineTextWrapper: {
    flex: 1,
  },
  inlineTitle: {
    fontFamily: typography.fontFamilies.sourceSansSemiBold,
    fontSize: typography.fontSizes.md,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  inlineMessage: {
    fontFamily: typography.fontFamilies.sourceSansRegular,
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.normal,
  },
  dismissButton: {
    padding: spacing.xs,
    marginTop: -4,
  },
});