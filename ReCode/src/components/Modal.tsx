import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
  StyleSheet,
  BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, spacing, borderRadius, typography, shadows } from "../styles";

export type ModalType = "danger" | "warning" | "info" | "success";

export interface ModalConfig {
  title: string;
  message?: string;
  type: ModalType;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
}

interface ModalTypeStyle {
  gradient: readonly [string, string];
  borderColor: string;
  icon: string;
  iconColor: string;
  titleColor: string;
  confirmGradient: readonly [string, string];
}

const typeStyles: Record<ModalType, ModalTypeStyle> = {
  danger: {
    gradient: ["#3a1a1a", "#280d0d"] as const,
    borderColor: "#a62d2d",
    icon: "close-circle",
    iconColor: "#a62d2d",
    titleColor: "#a62d2d",
    confirmGradient: ["#a62d2d", "#8b1e1e"] as const,
  },
  warning: {
    gradient: ["#3a3a1a", "#28280d"] as const,
    borderColor: "#e7d512",
    icon: "warning",
    iconColor: "#e7d512",
    titleColor: "#e7d512",
    confirmGradient: ["#e7d512", "#c4b510"] as const,
  },
  info: {
    gradient: ["#1a2a3a", "#0d1828"] as const,
    borderColor: "#7C5CFF",
    icon: "information-circle",
    iconColor: "#7C5CFF",
    titleColor: "#7C5CFF",
    confirmGradient: ["#7C5CFF", "#6b4df5"] as const,
  },
  success: {
    gradient: ["#1a3a2e", "#0d2818"] as const,
    borderColor: "#35a62d",
    icon: "check-circle",
    iconColor: "#67c767",
    titleColor: "#67c767",
    confirmGradient: ["#35a62d", "#2d8a24"] as const,
  },
};

/** Custom Modal Component - matches app design system */
export const Modal: React.FC<{
  visible: boolean;
  config: ModalConfig;
  onDismiss: () => void;
}> = ({ visible, config, onDismiss }) => {
  const [scaleAnim] = useState(() => new Animated.Value(0));
  const [fadeAnim] = useState(() => new Animated.Value(0));

  const { title, message, type, confirmText = "Confirmar", cancelText = "Cancelar", onConfirm, onCancel, confirmLoading } = config;
  const style = typeStyles[type];

  // Handlers defined before early return to satisfy Rules of Hooks
  const handleConfirm = useCallback(() => {
    if (confirmLoading) return;
    if (onConfirm) onConfirm();
    onDismiss();
  }, [onConfirm, onDismiss, confirmLoading]);

  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
    onDismiss();
  }, [onCancel, onDismiss]);

  // Handle hardware back button on Android
  useEffect(() => {
    if (!visible) return;

    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      handleCancel();
      return true; // Prevent default back behavior
    });

    return () => backHandler.remove();
  }, [visible, handleCancel]);

  // Animation effect - runs on mount and when visible changes
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
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
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  // Only render when visible (parent handles unmounting after animation)
  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.overlay,
        { opacity: fadeAnim },
      ]}
      pointerEvents={visible ? "auto" : "none"}
    >
      <Pressable onPress={handleCancel} style={styles.overlayTouch} />
      <Animated.View
        style={[
          styles.modalContainer,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <LinearGradient
          colors={style.gradient}
          style={[
            styles.modalGradient,
            { borderColor: style.borderColor },
          ]}
        >
          {/* Icon */}
          <View style={styles.iconWrapper}>
            <Ionicons
              // @ts-expect-error - Icon name is dynamic based on modal type
              name={style.icon}
              size={48}
              color={style.iconColor}
            />
          </View>

          {/* Title */}
          <Text style={[
            styles.title,
            { color: style.titleColor },
          ]}>
            {title}
          </Text>

          {/* Message */}
          {message && (
            <Text style={styles.message}>{message}</Text>
          )}

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            {cancelText && (
              <Pressable
                onPress={handleCancel}
                style={styles.cancelButton}
                disabled={confirmLoading}
              >
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </Pressable>
            )}
            <Pressable
              onPress={handleConfirm}
              style={[
                styles.confirmButton,
                confirmLoading && styles.buttonDisabled,
              ]}
              disabled={confirmLoading}
            >
              <LinearGradient
                colors={style.confirmGradient}
                style={[
                  styles.confirmButtonGradient,
                  confirmLoading && styles.buttonDisabled,
                ]}
              >
                {confirmLoading ? (
                  <View style={styles.loadingContainer}>
                    <Animated.View
                      style={[
                        styles.spinner,
                        {
                          transform: [
                            {
                              rotate: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ["0deg", "360deg"],
                              }),
                            },
                          ],
                        },
                      ]}
                    >
                      <Ionicons name="refresh" size={20} color={colors.textWhite} />
                    </Animated.View>
                  </View>
                ) : (
                  <Text style={styles.confirmButtonText}>{confirmText}</Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>
        </LinearGradient>

        {/* Glow effect */}
        <View
          style={[
            styles.glow,
            { backgroundColor: style.iconColor },
          ]}
        />
      </Animated.View>
    </Animated.View>
  );
};

/** Hook for managing modals */
export const useModal = () => {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

  const showModal = useCallback((config: ModalConfig): Promise<boolean> => {
    return new Promise((resolve) => {
      setModalConfig(config);
      setResolvePromise(() => resolve);
      setModalVisible(true);
    });
  }, []);

  const dismissModal = useCallback(() => {
    setModalVisible(false);
    if (resolvePromise) {
      resolvePromise(false);
      setResolvePromise(null);
    }
    // Clear config after animation
    setTimeout(() => setModalConfig(null), 300);
  }, [resolvePromise]);

  const confirmModal = useCallback(() => {
    if (modalConfig?.onConfirm) modalConfig.onConfirm();
    if (resolvePromise) {
      resolvePromise(true);
      setResolvePromise(null);
    }
    setModalVisible(false);
    setTimeout(() => setModalConfig(null), 300);
  }, [modalConfig, resolvePromise]);

  const cancelModal = useCallback(() => {
    if (modalConfig?.onCancel) modalConfig.onCancel();
    if (resolvePromise) {
      resolvePromise(false);
      setResolvePromise(null);
    }
    setModalVisible(false);
    setTimeout(() => setModalConfig(null), 300);
  }, [modalConfig, resolvePromise]);

  return {
    modalConfig,
    modalVisible,
    showModal,
    dismissModal,
    confirmModal,
    cancelModal,
  };
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    zIndex: 1000,
  },
  overlayTouch: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 340,
    borderRadius: borderRadius.xxxl,
    overflow: "hidden",
    ...shadows.large,
  },
  modalGradient: {
    borderWidth: 1,
    borderRadius: borderRadius.xxxl,
    padding: spacing.xl,
  },
  iconWrapper: {
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamilies.sourceSansSemiBold,
    fontSize: typography.fontSizes.xxl,
    lineHeight: typography.lineHeights.relaxed,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  message: {
    fontFamily: typography.fontFamilies.sourceSansRegular,
    fontSize: typography.fontSizes.md,
    lineHeight: typography.lineHeights.normal,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.md,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceDisabled,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontFamily: typography.fontFamilies.interSemiBold,
    fontSize: typography.fontSizes.md,
    color: colors.textPrimary,
  },
  confirmButton: {
    flex: 1,
    height: 50,
    borderRadius: borderRadius.md,
    overflow: "hidden",
    ...shadows.buttonPrimary,
  },
  confirmButtonGradient: {
    flex: 1,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  confirmButtonText: {
    fontFamily: typography.fontFamilies.interSemiBold,
    fontSize: typography.fontSizes.md,
    color: colors.textWhite,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "transparent",
    borderTopColor: colors.textWhite,
    borderRadius: 10,
  },
  glow: {
    position: "absolute",
    bottom: -6,
    left: spacing.md,
    right: spacing.md,
    height: 10,
    borderRadius: borderRadius.xxxl,
    opacity: 0.15,
  },
});