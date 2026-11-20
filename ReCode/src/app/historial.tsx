import { Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "../components/NavBar";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { historialStyles } from "../styles";

export default function Historial() {
  return (
    <LinearGradient
      colors={["#0C0C14", "#2f224b"]}
      style={[{ height: "100%", alignItems: "center" }]}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={historialStyles.container}>
        <View>
          <Text style={historialStyles.separator}>Historial</Text>

          <View style={historialStyles.formContainer}>
            <View style={historialStyles.headerRow}>
              <View style={historialStyles.headerLeft}>
                <Text style={historialStyles.sectionTitle}>Lenguaje: Python</Text>
                <Text style={historialStyles.dateText}>09/11/2026</Text>
              </View>
              <AntDesign name="check" size={32} color="#35a62d" />
            </View>
            <Text style={historialStyles.questionText}>
              ¿Qué es una list comprehension en Python?
            </Text>
          </View>

          <View style={historialStyles.formContainer}>
            <View style={historialStyles.headerRow}>
              <View style={historialStyles.headerLeft}>
                <Text style={historialStyles.sectionTitle}>Lenguaje: JavaScript</Text>
                <Text style={historialStyles.dateText}>08/11/2026</Text>
              </View>
              <AntDesign name="check" size={32} color="#35a62d" />
            </View>
            <Text style={historialStyles.questionText}>
              Diferencia entre let, const y var
            </Text>
          </View>

          <View style={historialStyles.formContainer}>
            <View style={historialStyles.headerRow}>
              <View style={historialStyles.headerLeft}>
                <Text style={historialStyles.sectionTitle}>Lenguaje: C++</Text>
                <Text style={historialStyles.dateText}>07/11/2026</Text>
              </View>
              <Feather name="x" size={34} color="#a62d2d" />
            </View>
            <Text style={historialStyles.questionText}>
              ¿Qué es la herencia múltiple en C++?
            </Text>
          </View>

          <View style={historialStyles.formContainer}>
            <View style={historialStyles.headerRow}>
              <View style={historialStyles.headerLeft}>
                <Text style={historialStyles.sectionTitle}>Lenguaje: Java</Text>
                <Text style={historialStyles.dateText}>06/11/2026</Text>
              </View>
              <AntDesign name="check" size={32} color="#35a62d" />
            </View>
            <Text style={historialStyles.questionText}>
              Diferencia entre ArrayList y LinkedList
            </Text>
          </View>

          <View style={historialStyles.formContainer}>
            <View style={historialStyles.headerRow}>
              <View style={historialStyles.headerLeft}>
                <Text style={historialStyles.sectionTitle}>Lenguaje: C</Text>
                <Text style={historialStyles.dateText}>05/09/2026</Text>
              </View>
              <AntDesign name="check" size={32} color="#35a62d" />
            </View>
            <Text style={historialStyles.questionText}>
              ¿Cuántos bytes ocupa un tipo de dato int?
            </Text>
          </View>

          <View style={historialStyles.formContainer}>
            <View style={historialStyles.headerRow}>
              <View style={historialStyles.headerLeft}>
                <Text style={historialStyles.sectionTitle}>Lenguaje: C</Text>
                <Text style={historialStyles.dateText}>04/09/2026</Text>
              </View>
              <Feather name="x" size={34} color="#a62d2d" />
            </View>
            <Text style={historialStyles.questionText}>
              ¿Cuántos bytes ocupa un tipo de dato int?
            </Text>
          </View>

          <View style={historialStyles.formContainer}>
            <View style={historialStyles.headerRow}>
              <View style={historialStyles.headerLeft}>
                <Text style={historialStyles.sectionTitle}>Lenguaje: Rust</Text>
                <Text style={historialStyles.dateText}>03/09/2026</Text>
              </View>
              <Feather name="x" size={34} color="#a62d2d" />
            </View>
            <Text style={historialStyles.questionText}>
              ¿Qué es el ownership en Rust?
            </Text>
          </View>

          <View style={historialStyles.formContainer}>
            <View style={historialStyles.headerRow}>
              <View style={historialStyles.headerLeft}>
                <Text style={historialStyles.sectionTitle}>Lenguaje: Go</Text>
                <Text style={historialStyles.dateText}>02/09/2026</Text>
              </View>
              <AntDesign name="check" size={32} color="#35a62d" />
            </View>
            <Text style={historialStyles.questionText}>
              ¿Qué son las goroutines en Go?
            </Text>
          </View>

          <View style={historialStyles.formContainer}>
            <View style={historialStyles.headerRow}>
              <View style={historialStyles.headerLeft}>
                <Text style={historialStyles.sectionTitle}>Lenguaje: TypeScript</Text>
                <Text style={historialStyles.dateText}>01/09/2026</Text>
              </View>
              <AntDesign name="check" size={32} color="#35a62d" />
            </View>
            <Text style={historialStyles.questionText}>
              ¿Qué son los generics en TypeScript?
            </Text>
          </View>
        </View>
      </ScrollView>

      <NavBar pantallaActual="historial" />
    </LinearGradient>
  );
}