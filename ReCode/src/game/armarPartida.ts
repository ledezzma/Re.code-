import {
  LENGUAJES,
  OPCIONES_PREVISOR,
  PREGUNTAS_CONTRARRELOJ,
  RONDAS_PREVISOR,
  type Modo,
} from "./constantes";
import type { PreguntaJuego } from "../database/preguntas";

/**
 * Una partida es una lista de rondas. Cada ronda ofrece una o más preguntas candidatas:
 *  - contrarreloj: 1 candidata por ronda (se responde directamente)
 *  - previsor: hasta 3 candidatas de lenguajes distintos; el jugador elige una
 * Todas se sortean al empezar la partida, así que no cambian mientras se juega.
 */
export type Ronda = PreguntaJuego[];

export function mezclar<T>(lista: readonly T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/** En el banco la respuesta correcta casi siempre va primero: se baraja en cada partida. */
function conRespuestasMezcladas(p: PreguntaJuego): PreguntaJuego {
  return { ...p, respuestas: mezclar(p.respuestas) };
}

/** 15 preguntas al azar, sin repetir, mezclando los lenguajes. */
export function armarContrarreloj(banco: PreguntaJuego[], cantidad = PREGUNTAS_CONTRARRELOJ): Ronda[] {
  return mezclar(banco)
    .slice(0, cantidad)
    .map((p) => [conRespuestasMezcladas(p)]);
}

/** 10 rondas de 3 opciones (lenguajes distintos). Una pregunta no se repite en toda la partida. */
export function armarPrevisor(
  banco: PreguntaJuego[],
  rondas = RONDAS_PREVISOR,
  opciones = OPCIONES_PREVISOR,
): Ronda[] {
  const colas = new Map(
    LENGUAJES.map((l) => [l, mezclar(banco.filter((p) => p.lenguaje === l))] as const),
  );

  const partida: Ronda[] = [];
  for (let i = 0; i < rondas; i++) {
    const conPreguntas = LENGUAJES.filter((l) => (colas.get(l)?.length ?? 0) > 0);
    if (conPreguntas.length === 0) break;
    const elegidos = mezclar(conPreguntas).slice(0, opciones);
    partida.push(elegidos.map((l) => conRespuestasMezcladas(colas.get(l)!.pop()!)));
  }
  return partida;
}

export function armarPartida(modo: Modo, banco: PreguntaJuego[]): Ronda[] {
  return modo === "previsor" ? armarPrevisor(banco) : armarContrarreloj(banco);
}
