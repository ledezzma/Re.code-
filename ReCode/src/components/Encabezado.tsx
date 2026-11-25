import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { encabezadoStyles } from "../styles";

type Props = {
  titulo: string;
  /** Elemento a la derecha del título (por ejemplo el cronómetro) */
  derecha?: ReactNode;
  onAtras?: () => void;
};

/** Barra superior con flecha de regreso y título, común a las pantallas secundarias. */
export default function Encabezado({ titulo, derecha, onAtras }: Props) {
  const router = useRouter();
  return (
    <View style={encabezadoStyles.barra}>
      <View style={encabezadoStyles.contenido}>
        <Pressable
          onPress={onAtras ?? (() => router.back())}
          accessibilityRole="button"
          accessibilityLabel="Regresar"
          hitSlop={8}
        >
          <Ionicons name="chevron-back-sharp" size={38} color="white" />
        </Pressable>
        <Text style={encabezadoStyles.titulo} numberOfLines={1}>
          {titulo}
        </Text>
        {derecha}
      </View>
    </View>
  );
}
