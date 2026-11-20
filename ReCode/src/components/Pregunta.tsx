import { Text, View, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { preguntaStyles } from "../styles";

interface PreguntaProps {
  /** Optional custom question text */
  question?: string;
  /** Optional array of answer options */
  answers?: string[];
  /** Optional correct answer index */
  correctAnswer?: number;
  /** Optional callback when answer is selected */
  onAnswerSelect?: (index: number) => void;
  /** Optional callback for hint button */
  onHintPress?: () => void;
  /** Optional callback for confirm/next button */
  onConfirmPress?: () => void;
  /** Optional language label */
  language?: string;
  /** Optional hint count */
  hints?: number;
}

export default function Pregunta({
  question = "¿Cuál de estos no es un tipo de dato primitivo?",
  answers = ["int", "char", "float", "struct"],
  correctAnswer = 3,
  onAnswerSelect,
  onHintPress,
  onConfirmPress,
  language = "C",
  hints = 3,
}: PreguntaProps) {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);

  const handleAnswerPress = (index: number) => {
    setSelectedAnswer(index);
    onAnswerSelect?.(index);
  };

  const handleConfirmPress = () => {
    if (onConfirmPress) {
      onConfirmPress();
    } else {
      router.back();
    }
  };

  return (
    <LinearGradient colors={["#0C0C14", "#1a1a2e"]} style={preguntaStyles.gradient}>
      <View style={preguntaStyles.tabBar}>
        <View style={preguntaStyles.tabBarContent}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back-sharp" size={38} color="white" />
          </Pressable>
          <Text style={preguntaStyles.tabTitle}>Pregunta</Text>
        </View>
      </View>

      <ScrollView
        style={preguntaStyles.scrollView}
        contentContainerStyle={preguntaStyles.scrollContent}
      >
        <View style={preguntaStyles.container}>
          <View style={preguntaStyles.languageRow}>
            <Text style={preguntaStyles.languageLabel}>Lenguaje</Text>
            <Text style={preguntaStyles.languageValue}>{language}</Text>
          </View>

          <Text style={preguntaStyles.questionTitle}>{question}</Text>

          <View style={preguntaStyles.answersContainer}>
            {answers.map((answer, index) => (
              <Pressable
                key={index}
                style={[
                  preguntaStyles.answerBlock,
                  selectedAnswer === index && preguntaStyles.answerBlockSelected,
                  selectedAnswer !== null &&
                    selectedAnswer !== index &&
                    preguntaStyles.answerBlockDisabled,
                ]}
                onPress={() => handleAnswerPress(index)}
                disabled={selectedAnswer !== null}
              >
                <Text
                  style={[
                    preguntaStyles.answerText,
                    selectedAnswer === index && preguntaStyles.answerTextSelected,
                  ]}
                >
                  {answer}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={preguntaStyles.bottomSection}>
            <Pressable style={preguntaStyles.hintButton} onPress={onHintPress}>
              <FontAwesome5 name="lightbulb" size={24} color="white" />
              <Text style={preguntaStyles.hintText}>Pistas: {hints}</Text>
            </Pressable>

            <Pressable
              style={[
                preguntaStyles.nextButton,
                selectedAnswer === null && preguntaStyles.nextButtonDisabled,
              ]}
              onPress={handleConfirmPress}
              disabled={selectedAnswer === null}
            >
              <Text style={preguntaStyles.nextButtonText}>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}