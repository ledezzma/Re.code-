import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Pregunta() {
  const router = useRouter();
  return (
    <LinearGradient colors={["#0C0C14", "#0C0C14"]}>
      <View style={styles.tabBar}>
        <View style={styles.tabBarContent}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back-sharp" size={38} color="white" />
          </Pressable>
          <Text style={[{ color: "white", fontSize: 22, marginLeft: 8 }]}>
            Pregunta
          </Text>
        </View>
      </View>

      <ScrollView style={[{}]}>
        <View style={styles.container}>
          <Text style={styles.textBlock}>Lenguaje: C {"\n"}</Text>
          <Text style={styles.title}>
            ¿Cuál de estos no es un tipo de dato primitivo?
          </Text>

          <Pressable style={styles.answerBlock}>
            <Text style={styles.textBlock}>int</Text>
          </Pressable>

          <Pressable style={styles.answerBlock}>
            <Text style={styles.textBlock}>char</Text>
          </Pressable>

          <Pressable style={styles.answerBlock}>
            <Text style={styles.textBlock}>float</Text>
          </Pressable>

          <Pressable style={styles.answerBlock}>
            <Text style={styles.textBlock}>struct</Text>
          </Pressable>

          <View style={styles.bottomSection}>
            <Pressable style={styles.hintButton}>
              <FontAwesome5 name="lightbulb" size={32} color="white" />
              <Text style={[styles.textBlock, { fontSize: 32 }]}> 3</Text>
            </Pressable>

            <Pressable style={styles.nextButton}>
              <Text style={[styles.textBlock, { fontSize: 32 }]}>
                Confirmar
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: Constants.statusBarHeight + 110,
  },
  hintButton: {
    backgroundColor: "#353b1d",
    flexDirection: "row",
    alignContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: "center",
    borderRadius: 20,
  },

  nextButton: {
    alignContent: "center",
    backgroundColor: "#1c381f",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    padding: 36,
  },
  textBlock: {
    fontSize: 24,
    color: "rgb(255, 255, 255)",
  },
  title: {
    fontFamily: "SourceSans3_600SemiBold",
    fontSize: 29,
    lineHeight: 44,
    marginBottom: 20,
    color: "#F2F2F7",
  },
  answerBlock: {
    marginBottom: 18,
    padding: 18,
    width: "100%",
    backgroundColor: "#1A2235",
    borderRadius: 20,
  },
  answerText: {
    marginTop: 14,
    padding: 16,
    width: "100%",
    backgroundColor: "#fff",
  },
  tabBar: {
    color: "white",
    width: "100%",
    height: Constants.statusBarHeight + 60,
    backgroundColor: "#0F0F16",
    borderBottomWidth: 1,
    borderColor: "#2c2c33",
  },
  tabBarContent: {
    marginHorizontal: 10,
    marginTop: Constants.statusBarHeight + 6,
    flexDirection: "row",
    alignItems: "center",
  },
});
