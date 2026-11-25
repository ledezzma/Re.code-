import { Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Encabezado from "./Encabezado";
import CodigoViewer from "./CodigoViewer";
import { nivelDe } from "../game/constantes";
import type { PreguntaJuego } from "../database/preguntas";
import { preguntaStyles } from "../styles";

interface PreguntaProps {
  pregunta: PreguntaJuego;
  /** Posición en la partida (1-based) y total, para el título */
  numero: number;
  total: number;
  /** Índice de la respuesta marcada (dentro de pregunta.respuestas) */
  seleccion: number | null;
  /** Ya se confirmó: se muestra cuál era la correcta y se cambia a "Siguiente" */
  confirmada: boolean;
  /** Índices de respuestas descartadas con una pista */
  ocultas: number[];
  pistas: number;
  puedeUsarPista: boolean;
  /** Si viene definido se muestra el cronómetro (modo contrarreloj) */
  segundos?: number;
  esUltima: boolean;
  onSeleccionar: (indice: number) => void;
  onPista: () => void;
  onConfirmar: () => void;
  onSiguiente: () => void;
}

function formatearTiempo(segundos: number) {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function Pregunta({
  pregunta,
  numero,
  total,
  seleccion,
  confirmada,
  ocultas,
  pistas,
  puedeUsarPista,
  segundos,
  esUltima,
  onSeleccionar,
  onPista,
  onConfirmar,
  onSiguiente,
}: PreguntaProps) {
  const nivel = nivelDe(pregunta.dificultad);
  const acerto = confirmada && seleccion !== null && pregunta.respuestas[seleccion]?.correcta;

  const reloj =
    segundos === undefined ? undefined : (
      <View
        style={[preguntaStyles.timer, segundos <= 10 && !confirmada && preguntaStyles.timerUrgente]}
        accessibilityRole="timer"
        accessibilityLabel={`Tiempo restante: ${segundos} segundos`}
      >
        <Ionicons name="time-outline" size={20} color={segundos <= 10 && !confirmada ? "#ec6666" : "#F2F2F7"} />
        <Text style={preguntaStyles.timerText}>{formatearTiempo(segundos)}</Text>
      </View>
    );

  return (
    <LinearGradient colors={["#0C0C14", "#1a1a2e"]} style={preguntaStyles.gradient}>
      <Encabezado titulo={`Pregunta ${numero}/${total}`} derecha={reloj} />

      <ScrollView
        style={preguntaStyles.scrollView}
        contentContainerStyle={preguntaStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={preguntaStyles.container}>
          <View style={preguntaStyles.languageRow}>
            <Text style={preguntaStyles.languageLabel}>Lenguaje</Text>
            <Text style={preguntaStyles.languageValue}>{pregunta.lenguaje}</Text>
            <Text style={[preguntaStyles.languageLevel, { color: nivel.color }]}>{nivel.texto}</Text>
          </View>

          <Text style={preguntaStyles.questionTitle}>{pregunta.texto}</Text>

          {pregunta.codigo !== null && (
            <CodigoViewer codigo={pregunta.codigo} mostrarNumeros={pregunta.mostrarNumeros} />
          )}

          <View style={preguntaStyles.answersContainer}>
            {pregunta.respuestas.map((respuesta, index) => {
              if (ocultas.includes(index)) return null;
              const elegida = seleccion === index;
              const esCorrecta = confirmada && respuesta.correcta;
              const esError = confirmada && elegida && !respuesta.correcta;
              return (
                <Pressable
                  key={respuesta.id}
                  style={[
                    preguntaStyles.answerBlock,
                    elegida && !confirmada && preguntaStyles.answerBlockSelected,
                    esCorrecta && preguntaStyles.answerBlockCorrect,
                    esError && preguntaStyles.answerBlockWrong,
                    confirmada && !esCorrecta && !esError && preguntaStyles.answerBlockDisabled,
                  ]}
                  onPress={() => onSeleccionar(index)}
                  disabled={confirmada}
                  accessibilityRole="button"
                  accessibilityState={{ selected: elegida, disabled: confirmada }}
                >
                  <Text
                    style={[
                      preguntaStyles.answerText,
                      elegida && !confirmada && preguntaStyles.answerTextSelected,
                      esCorrecta && preguntaStyles.answerTextCorrect,
                      esError && preguntaStyles.answerTextWrong,
                    ]}
                  >
                    {respuesta.texto}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {confirmada && (
            <Text style={[preguntaStyles.feedback, { color: acerto ? "#71ec66" : "#ec6666" }]}>
              {acerto ? "¡Correcto!" : "Incorrecto"}
            </Text>
          )}

          <View style={preguntaStyles.bottomSection}>
            <Pressable
              style={[preguntaStyles.hintButton, !puedeUsarPista && preguntaStyles.hintButtonDisabled]}
              onPress={onPista}
              disabled={!puedeUsarPista}
              accessibilityRole="button"
              accessibilityLabel={`Usar una pista. Te quedan ${pistas}`}
            >
              <FontAwesome5 name="lightbulb" size={24} color="#0C0C14" />
              <Text style={preguntaStyles.hintText}>Pistas: {pistas}</Text>
            </Pressable>

            {confirmada ? (
              <Pressable style={preguntaStyles.nextButton} onPress={onSiguiente}>
                <Text style={preguntaStyles.nextButtonText}>{esUltima ? "Finalizar" : "Siguiente"}</Text>
              </Pressable>
            ) : (
              <Pressable
                style={[preguntaStyles.nextButton, seleccion === null && preguntaStyles.nextButtonDisabled]}
                onPress={onConfirmar}
                disabled={seleccion === null}
              >
                <Text style={preguntaStyles.nextButtonText}>Confirmar</Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
