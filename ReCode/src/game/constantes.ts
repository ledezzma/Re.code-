/** Constantes compartidas por los modos de juego y la configuración de preguntas. */

export const LENGUAJES = ["C", "C++", "Java", "JavaScript", "Python"] as const;
export type Lenguaje = (typeof LENGUAJES)[number];

export type Dificultad = 1 | 2 | 3;

export const NIVELES: { id: Dificultad; texto: string; color: string }[] = [
  { id: 1, texto: "Fácil", color: "#71ec66" },
  { id: 2, texto: "Media", color: "#e2b544" },
  { id: 3, texto: "Difícil", color: "#ec6666" },
];

export function nivelDe(dificultad: number) {
  return NIVELES.find((n) => n.id === dificultad) ?? NIVELES[0];
}

/** Columna de la tabla `usuario` (SQLite) donde se guarda la dificultad de cada lenguaje. */
export const COLUMNA_DIFICULTAD: Record<Lenguaje, string> = {
  C: "dificultad_c",
  "C++": "dificultad_cpp",
  Java: "dificultad_java",
  JavaScript: "dificultad_javascript",
  Python: "dificultad_python",
};

/**
 * Niveles activos de cada lenguaje, guardados como banderas (bits) en la tabla `usuario`:
 * 1 = fácil, 2 = media, 4 = difícil. Se pueden combinar (5 = fácil y difícil) y 0 = ninguna.
 */
export const BANDERA: Record<Dificultad, number> = { 1: 1, 2: 2, 3: 4 };
export const TODAS_LAS_BANDERAS = 7;

export type ConfigPreguntas = Record<Lenguaje, number>;

export function nivelActivo(banderas: number, nivel: Dificultad): boolean {
  return (banderas & BANDERA[nivel]) !== 0;
}

export function alternarNivel(banderas: number, nivel: Dificultad): number {
  return banderas ^ BANDERA[nivel];
}

/** Niveles (1, 2, 3) que están activos en unas banderas */
export function nivelesActivos(banderas: number): Dificultad[] {
  return NIVELES.filter((n) => nivelActivo(banderas, n.id)).map((n) => n.id);
}

/** Por defecto solo está activo el nivel fácil de cada lenguaje */
export function configPorDefecto(): ConfigPreguntas {
  return Object.fromEntries(LENGUAJES.map((l) => [l, 1])) as ConfigPreguntas;
}

export type Modo = "contrarreloj" | "previsor";

export const PREGUNTAS_CONTRARRELOJ = 15;
export const SEGUNDOS_POR_PREGUNTA = 30;
export const RONDAS_PREVISOR = 10;
export const OPCIONES_PREVISOR = 3;
export const PISTAS_POR_PARTIDA = 3;

/** id_usuario con el que se guarda lo del modo invitado (en el servidor los ids empiezan en 1). */
export const ID_INVITADO = 0;
