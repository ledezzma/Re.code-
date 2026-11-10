import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import NavBar from "../components/NavBar";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

export default function Historial() {
  return (
    <LinearGradient
      colors={["#0C0C14", "#2f224b"]}
      style={[{ height: "100%", alignItems: "center" }]}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          <Text style={styles.separator}>Historial</Text>

          <View style={styles.formContainer}>
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <Text style={styles.sectionTitle}>Lenguaje: Python</Text>
                <Text style={styles.dateText}>09/11/2026</Text>
              </View>
              <AntDesign name="check" size={32} color="#35a62d" />
            </View>
            <Text style={styles.questionText}>
              ¿Qué es una list comprehension en Python?
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <Text style={styles.sectionTitle}>Lenguaje: JavaScript</Text>
                <Text style={styles.dateText}>08/11/2026</Text>
              </View>
              <AntDesign name="check" size={32} color="#35a62d" />
            </View>
            <Text style={styles.questionText}>
              Diferencia entre let, const y var
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <Text style={styles.sectionTitle}>Lenguaje: C++</Text>
                <Text style={styles.dateText}>07/11/2026</Text>
              </View>
              <Feather name="x" size={34} color="#a62d2d" />
            </View>
            <Text style={styles.questionText}>
              ¿Qué es la herencia múltiple en C++?
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <Text style={styles.sectionTitle}>Lenguaje: Java</Text>
                <Text style={styles.dateText}>06/11/2026</Text>
              </View>
              <AntDesign name="check" size={32} color="#35a62d" />
            </View>
            <Text style={styles.questionText}>
              Diferencia entre ArrayList y LinkedList
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <Text style={styles.sectionTitle}>Lenguaje: C</Text>
                <Text style={styles.dateText}>05/09/2026</Text>
              </View>
              <AntDesign name="check" size={32} color="#35a62d" />
            </View>
            <Text style={styles.questionText}>
              ¿Cuántos bytes ocupa un tipo de dato int?
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <Text style={styles.sectionTitle}>Lenguaje: C</Text>
                <Text style={styles.dateText}>04/09/2026</Text>
              </View>
              <Feather name="x" size={34} color="#a62d2d" />
            </View>
            <Text style={styles.questionText}>
              ¿Cuántos bytes ocupa un tipo de dato int?
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <Text style={styles.sectionTitle}>Lenguaje: Rust</Text>
                <Text style={styles.dateText}>03/09/2026</Text>
              </View>
              <Feather name="x" size={34} color="#a62d2d" />
            </View>
            <Text style={styles.questionText}>
              ¿Qué es el ownership en Rust?
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <Text style={styles.sectionTitle}>Lenguaje: Go</Text>
                <Text style={styles.dateText}>02/09/2026</Text>
              </View>
              <AntDesign name="check" size={32} color="#35a62d" />
            </View>
            <Text style={styles.questionText}>
              ¿Qué son las goroutines en Go?
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <Text style={styles.sectionTitle}>Lenguaje: TypeScript</Text>
                <Text style={styles.dateText}>01/09/2026</Text>
              </View>
              <AntDesign name="check" size={32} color="#35a62d" />
            </View>
            <Text style={styles.questionText}>
              ¿Qué son los generics en TypeScript?
            </Text>
          </View>
        </View>
      </ScrollView>

      <NavBar pantallaActual="historial"></NavBar>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  formContainer: {
    padding: 24,
    backgroundColor: "#1A1A28",
    width: "96%",
    borderRadius: 24,
    borderColor: "#2c2c33",
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  separator: {
    color: "#7C5CFF",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 100,
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoWrap: {
    marginTop: Constants.statusBarHeight + 40,
    alignItems: "center",
  },
  logo: {
    fontFamily: "PixelifySans_700Bold",
    fontSize: 50,
    letterSpacing: 1,
    color: "#D9D9DE",
  },
  logoAccent: {
    color: "#7C5CFF",
  },
  textBlock: {
    margin: 10,
    fontSize: 16,
    color: "#fff",
  },
  title: {
    fontFamily: "SourceSans3_600SemiBold",
    fontSize: 29,
    lineHeight: 44,
    color: "#F2F2F7",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },
  dateText: {
    color: "#6B6B7A",
    fontSize: 13,
    fontWeight: "500",
  },
  titleAccent: {
    color: "#7C5CFF",
  },
  questionText: {
    color: "#E8E8ED",
    fontSize: 17,
    lineHeight: 26,
    fontWeight: "400",
    marginTop: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
});