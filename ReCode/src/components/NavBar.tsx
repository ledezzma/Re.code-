import { View, Pressable, StyleSheet, Text } from "react-native";
import Constants from 'expo-constants';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";



export default function NavBar({
  pantallaActual
  
}: Props) {
  const router = useRouter()

  return (
    <View style={styles.navBar}>
      {
        pantallaActual == "home" ?
          <View style={styles.navBarContent}>
            <FontAwesome6 name="house" size={24} color="#cfcfd1" />
            <Text style={[styles.subtitle, {color:"#cfcfd1"}]}>Home</Text>
          </View> 
        :
          <Pressable style={styles.navBarContent} onPress={() => router.push("/home")}>
            <FontAwesome6 name="house" size={24} color="#8A8AA3" />
            <Text style={styles.subtitle}>Home</Text>
          </Pressable>
      }

      {
        pantallaActual == "historial" ?
          <View style={styles.navBarContent}>
            <AntDesign name="history" size={24} color="#cfcfd1" />
            <Text style={[styles.subtitle, {color:"#cfcfd1"}]}>Historial</Text>
          </View>
        :
          <Pressable style={styles.navBarContent} onPress={() => router.push("/historial")}>
            <AntDesign name="history" size={24} color="#8A8AA3" />
            <Text style={styles.subtitle}>Historial</Text>
          </Pressable>
      }

      {
        pantallaActual == "config" ?
          <View style={styles.navBarContent}>
            <FontAwesome6 name="gear" size={24} color="#cfcfd1" />
            <Text style={[styles.subtitle, {color:"#cfcfd1"}]}>Config</Text>
          </View>
        :
          <Pressable style={styles.navBarContent} onPress={() => router.push("/config")}>
            <FontAwesome6 name="gear" size={24} color="#8A8AA3" />
            <Text style={styles.subtitle}>Config</Text>
          </Pressable>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  navBar: {
    borderTopWidth: 1,
    borderColor: "grey",
    height: Constants.statusBarHeight + 22,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#13111a",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  navBarContent: {
    alignItems: "center",
    width: "25%"
  },
  subtitle: {
    fontFamily: "SourceSans3_400Regular",
    fontSize: 18,
    lineHeight: 22,
    color: "#8A8AA3",
  }
});
