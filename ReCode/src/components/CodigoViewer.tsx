import { Text, View, type StyleProp, type ViewStyle } from "react-native";
import { ANCHO_CARACTER, codigoStyles } from "../styles";

type Props = {
  /** Código tal como está en el banco de preguntas: las líneas se separan con "\n". */
  codigo: string;
  /** Muestra el número de cada línea (útil en preguntas del tipo "¿en qué línea está el error?"). */
  mostrarNumeros?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Muestra un fragmento de código en una tarjeta oscura con fuente monoespaciada.
 *  - Respeta la indentación y las líneas en blanco.
 *  - Las líneas largas se parten dentro de la tarjeta; al numerar, el número solo
 *    aparece en la primera parte de la línea y el resto queda alineado con el código.
 */
export default function CodigoViewer({ codigo, mostrarNumeros = false, style }: Props) {
  const lineas = codigo
    .replace(/\r\n?/g, "\n")
    .replace(/\t/g, "    ")
    .replace(/\n+$/, "")
    .split("\n");

  // El ancho de la columna de números depende de cuántos dígitos tiene el último
  const anchoNumero = String(lineas.length).length * ANCHO_CARACTER;

  return (
    <View style={[codigoStyles.tarjeta, style]} accessibilityLabel="Fragmento de código">
      {lineas.map((linea, i) => (
        <View key={i} style={codigoStyles.fila}>
          {mostrarNumeros && (
            <Text
              style={[codigoStyles.numero, { width: anchoNumero }]}
              allowFontScaling={false}
              accessibilityElementsHidden
              importantForAccessibility="no"
            >
              {i + 1}
            </Text>
          )}
          {/* " " en las líneas vacías para que conserven su alto */}
          <Text style={codigoStyles.linea} allowFontScaling={false} selectable>
            {linea === "" ? " " : linea}
          </Text>
        </View>
      ))}
    </View>
  );
}
