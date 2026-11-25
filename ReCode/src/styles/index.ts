/**
 * Centralized styles export
 * Import styles from here instead of defining them inline
 */

// Common design tokens and shared styles
export * from "./common";

// Screen styles
export { homeStyles } from "./screens/home";
export { configStyles } from "./screens/config";
export { loginStyles } from "./screens/login";
export { registroStyles } from "./screens/registro";
export { historialStyles } from "./screens/historial";
export { welcomeStyles } from "./screens/welcome";

// Component styles
export { navBarStyles } from "./components/navBar";
export { logoStyles } from "./components/logo";
export { botonStyles } from "./components/boton";
export { preguntaStyles } from "./components/pregunta";
export { encabezadoStyles } from "./components/encabezado";
export { codigoStyles, ANCHO_CARACTER, FUENTE_CODIGO } from "./components/codigo";
export { seleccionStyles } from "./components/seleccionPregunta";
export { dificultadStyles } from "./screens/dificultad";
export { pwdcodeStyles } from "./screens/pwdcode";
