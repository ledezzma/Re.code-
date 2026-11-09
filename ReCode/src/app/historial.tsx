import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Constants from 'expo-constants';
import NavBar from "../components/NavBar";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

export default function Historial() {
  const router = useRouter();
  return (
    <LinearGradient colors={["#0C0C14", "#2f224b"]} style={[{height:"100%", alignItems:"center"}]}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          <Text style={styles.separator}>Historial{"\n"}</Text>

          <View style={styles.formContainer}>
            <View style={[{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}]}>
              <View>
                <View style={[{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}]}>
                  <Text style={styles.sectionTitle}>Lenguaje: C</Text>
                  <Text style={styles.subtitle}>05/09/2026</Text>
                </View>
                <Text style={[styles.subtitle, {maxWidth: "80%"}]}>¿Cuántos bytes ocupa un tipo de dato int?</Text>
              </View>
              <AntDesign name="check" size={40} color="#35a62d" />
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={[{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}]}>
              <View>
                <View style={[{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}]}>
                  <Text style={styles.sectionTitle}>Lenguaje: C</Text>
                  <Text style={styles.subtitle}>04/09/2026</Text>
                </View>
                <Text style={[styles.subtitle, {maxWidth: "80%"}]}>¿Cuántos bytes ocupa un tipo de dato int?</Text>
              </View>
              <Feather name="x" size={42} color="#a62d2d" />
            </View>
          </View>

        </View>
      </ScrollView>
      
      <NavBar pantallaActual = "historial"></NavBar>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  formContainer: {
    padding: 22,
    backgroundColor: '#1A1A28',
    width: "96%",
    borderRadius: 30,
    borderColor: "#2c2c33",
    borderWidth: 1,
    marginBottom: 20,
  },
  separator: {
    color: "#7C5CFF",
    fontSize: 24,
    marginTop: 100,
    textAlign:"center"
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoWrap: {
    marginTop: Constants.statusBarHeight + 40,
    alignItems: "center"
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
    color: "white",
    fontSize: 17,
    marginRight: 8,
    marginBottom: 5,
  },
  titleAccent: {
    color: "#7C5CFF",
  },
  subtitle: {
    fontFamily: "SourceSans3_400Regular",
    fontSize: 16,
    lineHeight: 22,
    color: "#8A8AA3",
  }
});
