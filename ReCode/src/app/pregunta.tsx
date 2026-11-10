import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Pregunta() {
  const router = useRouter();
  return (
    <LinearGradient colors={["#0C0C14", "#1a1a2e"]} style={styles.gradient}>
      <View style={styles.tabBar}>
        <View style={styles.tabBarContent}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back-sharp" size={38} color="white" />
          </Pressable>
          <Text style={styles.tabTitle}>Pregunta</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          <View style={styles.languageRow}>
            <Text style={styles.languageLabel}>Lenguaje</Text>
            <Text style={styles.languageValue}>C</Text>
          </View>

          <Text style={styles.questionTitle}>
            ¿Cuál de estos no es un tipo de dato primitivo?
          </Text>

          <View style={styles.answersContainer}>
            <Pressable style={styles.answerBlock}>
              <Text style={styles.answerText}>int</Text>
            </Pressable>

            <Pressable style={styles.answerBlock}>
              <Text style={styles.answerText}>char</Text>
            </Pressable>

            <Pressable style={styles.answerBlock}>
              <Text style={styles.answerText}>float</Text>
            </Pressable>

            <Pressable style={styles.answerBlock}>
              <Text style={styles.answerText}>struct</Text>
            </Pressable>
          </View>

          <View style={styles.bottomSection}>
            <Pressable style={styles.hintButton}>
              <FontAwesome5 name="lightbulb" size={24} color="white" />
              <Text style={styles.hintText}>Pistas: 3</Text>
            </Pressable>

            <Pressable style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Constants.statusBarHeight + 140,
  },
  tabBar: {
    width: "100%",
    height: Constants.statusBarHeight + 64,
    backgroundColor: "#0F0F16",
    borderBottomWidth: 1,
    borderColor: "#2c2c33",
  },
  tabBarContent: {
    marginHorizontal: 20,
    marginTop: Constants.statusBarHeight + 8,
    flexDirection: "row",
    alignItems: "center",
  },
  tabTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
    marginLeft: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#2c2c33",
  },
  languageLabel: {
    color: "#6B6B7A",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginRight: 10,
  },
  languageValue: {
    color: "#7C5CFF",
    fontSize: 18,
    fontWeight: "700",
  },
  questionTitle: {
    fontFamily: "SourceSans3_600SemiBold",
    fontSize: 26,
    lineHeight: 36,
    color: "#F2F2F7",
    marginBottom: 32,
  },
  answersContainer: {
    marginBottom: 40,
  },
  answerBlock: {
    backgroundColor: "#1A1A28",
    borderWidth: 1,
    borderColor: "#767684",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 14,
    width: "100%",
  },
  answerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#E8E8ED",
    textAlign: "center",
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  hintButton: {
    backgroundColor: "#e7d512",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#3a3a4a",
  },
  hintText: {
    color: "#F2F2F7",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  nextButton: {
    backgroundColor: "#67c767",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    shadowColor: "#7C5CFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
