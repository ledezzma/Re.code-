import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const encabezadoStyles = StyleSheet.create({
  barra: {
    width: "100%",
    height: Constants.statusBarHeight + 60,
    backgroundColor: "#0F0F16",
    borderBottomWidth: 1,
    borderColor: "#2c2c33",
  },
  contenido: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  titulo: {
    flex: 1,
    color: "white",
    fontSize: 22,
    marginLeft: 8,
  },
});
