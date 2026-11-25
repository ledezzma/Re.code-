import { StyleSheet } from "react-native";

/** Fuente monoespaciada (se carga en app/_layout.tsx) */
export const FUENTE_CODIGO = "JetBrainsMono_600SemiBold";
export const TAMANO_CODIGO = 14;
/** Ancho aproximado de un carácter en la fuente monoespaciada (≈ 0.6 del tamaño) */
export const ANCHO_CARACTER = TAMANO_CODIGO * 0.6;

export const codigoStyles = StyleSheet.create({
  tarjeta: {
    backgroundColor: "#0F0F16",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#2c2c33",
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  fila: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  numero: {
    fontFamily: FUENTE_CODIGO,
    fontSize: TAMANO_CODIGO,
    lineHeight: 24,
    color: "#8E8EA8",
    textAlign: "right",
    marginRight: 14,
  },
  linea: {
    flex: 1,
    fontFamily: FUENTE_CODIGO,
    fontSize: TAMANO_CODIGO,
    lineHeight: 24,
    color: "#F2F2F7",
  },
});
