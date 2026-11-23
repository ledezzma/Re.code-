import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Encabezado from "./Encabezado";
import { nivelDe } from "../game/constantes";
import type { PreguntaJuego } from "../database/preguntas";
import { seleccionStyles } from "../styles";

type Props = {
  opciones: PreguntaJuego[];
  ronda: number;
  total: number;
  aciertos: number;
  onConfirmar: (pregunta: PreguntaJuego) => void;
};

/** Modo Previsor: antes de cada pregunta se ve su lenguaje y dificultad y se elige entre 3. */
export default function SeleccionPregunta({ opciones, ronda, total, aciertos, onConfirmar }: Props) {
  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <LinearGradient colors={["#0C0C14", "#1a1a2e"]} style={{ flex: 1 }}>
      <Encabezado titulo={`Elige tu pregunta`} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={seleccionStyles.container}>
          <Text style={seleccionStyles.separator}>Lenguaje y dificultad</Text>
          <Text style={seleccionStyles.ayuda}>
            Aciertos hasta ahora: {aciertos} / {ronda - 1}
          </Text>

          {opciones.map((op) => {
            const activa = elegida === op.id;
            const nivel = nivelDe(op.dificultad);
            return (
              <Pressable
                key={op.id}
                style={[seleccionStyles.formContainer, activa && seleccionStyles.formActiva]}
                onPress={() => setElegida(op.id)}
                accessibilityRole="button"
                accessibilityState={{ selected: activa }}
              >
                <View style={seleccionStyles.fila}>
                  <Text style={seleccionStyles.sectionTitle}>Lenguaje: {op.lenguaje}</Text>
                  <Text style={[seleccionStyles.nivel, { color: nivel.color }]}>{nivel.texto}</Text>
                </View>
              </Pressable>
            );
          })}

          <Pressable
            style={[seleccionStyles.confirmButton, elegida === null && seleccionStyles.confirmDisabled]}
            disabled={elegida === null}
            onPress={() => {
              const op = opciones.find((o) => o.id === elegida);
              if (op) onConfirmar(op);
            }}
          >
            <Text style={seleccionStyles.confirmText}>Confirmar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
