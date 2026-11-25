import type { SQLiteDatabase } from "expo-sqlite";
import {
  LENGUAJES,
  nivelesActivos,
  type ConfigPreguntas,
  type Dificultad,
  type Lenguaje,
} from "../game/constantes";

export interface Respuesta {
  id: number;
  texto: string;
  correcta: boolean;
}

export interface PreguntaJuego {
  id: number;
  lenguaje: Lenguaje;
  dificultad: Dificultad;
  texto: string;
  /** Código de apoyo (con saltos de línea reales) o null si la pregunta no lleva. */
  codigo: string | null;
  mostrarNumeros: boolean;
  respuestas: Respuesta[];
}

/**
 * Carga del banco las preguntas que corresponden a la configuración del usuario:
 * para cada lenguaje, solo las de los niveles que tiene activos (puede ser ninguno).
 */
export async function cargarBanco(
  db: SQLiteDatabase,
  config: ConfigPreguntas,
): Promise<PreguntaJuego[]> {
  const activos = LENGUAJES.map((l) => ({ lenguaje: l, niveles: nivelesActivos(config[l]) })).filter(
    (a) => a.niveles.length > 0,
  );
  if (activos.length === 0) return []; // el usuario desactivó todos los niveles de todos los lenguajes

  const filtro = activos
    .map((a) => `(p.lenguaje = ? AND p.dificultad IN (${a.niveles.map(() => "?").join(",")}))`)
    .join(" OR ");
  const parametros = activos.flatMap((a) => [a.lenguaje, ...a.niveles]);

  const filas = await db.getAllAsync<{
    id_pregunta: number;
    lenguaje: Lenguaje;
    dificultad: Dificultad;
    pregunta: string;
    codigo: string | null;
    numeros: number | null;
  }>(
    `SELECT p.id_pregunta, p.lenguaje, p.dificultad, p.pregunta,
            k.contenido AS codigo, k.mostrar_num_de_linea AS numeros
       FROM preguntas p
       LEFT JOIN codigos k ON k.id_codigo = p.id_codigo
      WHERE ${filtro}`,
    ...parametros,
  );
  if (filas.length === 0) return [];

  const ids = filas.map((f) => f.id_pregunta);
  const respuestas = await db.getAllAsync<{
    id_pregunta: number;
    id_respuesta: number;
    respuesta: string;
    es_correcta: number;
  }>(
    `SELECT id_pregunta, id_respuesta, respuesta, es_correcta
       FROM respuestas
      WHERE id_pregunta IN (${ids.map(() => "?").join(",")})
      ORDER BY id_respuesta`,
    ...ids,
  );

  const porPregunta = new Map<number, Respuesta[]>();
  for (const r of respuestas) {
    const lista = porPregunta.get(r.id_pregunta) ?? [];
    lista.push({ id: r.id_respuesta, texto: r.respuesta, correcta: r.es_correcta === 1 });
    porPregunta.set(r.id_pregunta, lista);
  }

  return filas
    // una pregunta sin respuesta correcta no se puede jugar
    .filter((f) => porPregunta.get(f.id_pregunta)?.some((r) => r.correcta))
    .map((f) => ({
      id: f.id_pregunta,
      lenguaje: f.lenguaje,
      dificultad: f.dificultad,
      texto: f.pregunta,
      codigo: f.codigo,
      mostrarNumeros: f.numeros === 1,
      respuestas: porPregunta.get(f.id_pregunta) ?? [],
    }));
}
