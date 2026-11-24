import { Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "../components/NavBar";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { historialStyles, viewStyles } from "../styles";

interface HistoryItem {
  language: string;
  date: string;
  question: string;
  correct: boolean;
}

const historyData: HistoryItem[] = [
  { language: "Python", date: "09/11/2026", question: "¿Qué es una list comprehension en Python?", correct: true },
  { language: "JavaScript", date: "08/11/2026", question: "Diferencia entre let, const y var", correct: true },
  { language: "C++", date: "07/11/2026", question: "¿Qué es la herencia múltiple en C++?", correct: false },
  { language: "Java", date: "06/11/2026", question: "Diferencia entre ArrayList y LinkedList", correct: true },
  { language: "C", date: "05/09/2026", question: "¿Cuántos bytes ocupa un tipo de dato int?", correct: true },
  { language: "C", date: "04/09/2026", question: "¿Cuántos bytes ocupa un tipo de dato int?", correct: false },
  { language: "Rust", date: "03/09/2026", question: "¿Qué es el ownership en Rust?", correct: false },
  { language: "Go", date: "02/09/2026", question: "¿Qué son las goroutines en Go?", correct: true },
  { language: "TypeScript", date: "01/09/2026", question: "¿Qué son los generics en TypeScript?", correct: true },
];

export default function Historial() {
  return (
    <LinearGradient
      colors={["#0C0C14", "#2f224b"]}
      style={[{ height: "100%", alignItems: "center" }]}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={historialStyles.container}>
        <View>
          <Text style={historialStyles.separator}>Historial</Text>

          {historyData.map((item, index) => (
            <View
              key={index}
              style={[
                historialStyles.formContainer,
                item.correct ? viewStyles.boxSuccessSubtle : viewStyles.boxErrorSubtle,
              ]}
            >
              <View style={historialStyles.headerRow}>
                <View style={historialStyles.headerLeft}>
                  <Text style={historialStyles.sectionTitle}>Lenguaje: {item.language}</Text>
                  <Text style={historialStyles.dateText}>{item.date}</Text>
                </View>
                {item.correct ? (
                  <AntDesign name="check" size={32} color="#35a62d" />
                ) : (
                  <Feather name="x" size={34} color="#a62d2d" />
                )}
              </View>
              <Text style={historialStyles.questionText}>{item.question}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <NavBar pantallaActual="historial" />
    </LinearGradient>
  );
}