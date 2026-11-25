import type { SQLiteDatabase } from "expo-sqlite";
import type { Dificultad, Lenguaje } from "../game/constantes";

export const REGISTROS_POR_PAGINA = 10;

export interface RegistroHistorial {
  id_registro: number;
  id_pregunta: number;
  correcta: boolean;
  /** 'YYYY-MM-DD HH:MM:SS' en UTC (datetime('now') de SQLite) */
  fecha: string;
  lenguaje: Lenguaje;
  dificultad: Dificultad;
  pregunta: string;
}

/** Formato en que viaja el historial entre la app y la API. */
export interface RegistroNube {
  id_pregunta: number;
  fecha: string;
  correcta: boolean;
}

export async function registrarRespuesta(
  db: SQLiteDatabase,
  idUsuario: number,
  idPregunta: number,
  correcta: boolean,
) {
  await db.runAsync(
    "INSERT INTO historial (id_usuario, id_pregunta, correcta) VALUES (?, ?, ?)",
    idUsuario,
    idPregunta,
    correcta ? 1 : 0,
  );
}

export async function contarHistorial(db: SQLiteDatabase, idUsuario: number): Promise<number> {
  const fila = await db.getFirstAsync<{ total: number }>(
    `SELECT COUNT(*) AS total
       FROM historial h JOIN preguntas p ON p.id_pregunta = h.id_pregunta
      WHERE h.id_usuario = ?`,
    idUsuario,
  );
  return fila?.total ?? 0;
}

/** Una página del historial, del registro más reciente al más antiguo. `pagina` empieza en 0. */
export async function obtenerHistorial(
  db: SQLiteDatabase,
  idUsuario: number,
  pagina: number,
): Promise<RegistroHistorial[]> {
  const filas = await db.getAllAsync<Omit<RegistroHistorial, "correcta"> & { correcta: number }>(
    `SELECT h.id_registro, h.id_pregunta, h.correcta, h.fecha,
            p.lenguaje, p.dificultad, p.pregunta
       FROM historial h JOIN preguntas p ON p.id_pregunta = h.id_pregunta
      WHERE h.id_usuario = ?
      ORDER BY h.fecha DESC, h.id_registro DESC
      LIMIT ? OFFSET ?`,
    idUsuario,
    REGISTROS_POR_PAGINA,
    pagina * REGISTROS_POR_PAGINA,
  );
  return filas.map((f) => ({ ...f, correcta: f.correcta === 1 }));
}

// ---------- Cargar / descargar datos ----------
export async function exportarHistorial(db: SQLiteDatabase, idUsuario: number): Promise<RegistroNube[]> {
  const filas = await db.getAllAsync<{ id_pregunta: number; fecha: string; correcta: number }>(
    "SELECT id_pregunta, fecha, correcta FROM historial WHERE id_usuario = ? ORDER BY fecha",
    idUsuario,
  );
  // La API recibe datetimes ISO; la fecha local es UTC, por eso el 'Z'
  return filas.map((f) => ({
    id_pregunta: f.id_pregunta,
    fecha: `${f.fecha.replace(" ", "T")}Z`,
    correcta: f.correcta === 1,
  }));
}

/** Mezcla con el historial local los registros de la nube. Devuelve cuántos eran nuevos. */
export async function importarHistorial(
  db: SQLiteDatabase,
  idUsuario: number,
  registros: RegistroNube[],
): Promise<number> {
  let nuevos = 0;
  await db.withTransactionAsync(async () => {
    for (const r of registros) {
      const resultado = await db.runAsync(
        // OR IGNORE + índice único: los que ya existen no se duplican.
        // El EXISTS descarta ids de pregunta que este banco no tiene.
        `INSERT OR IGNORE INTO historial (id_usuario, id_pregunta, correcta, fecha)
         SELECT ?, ?, ?, ? WHERE EXISTS (SELECT 1 FROM preguntas WHERE id_pregunta = ?)`,
        idUsuario,
        r.id_pregunta,
        r.correcta ? 1 : 0,
        // normaliza a 'YYYY-MM-DD HH:MM:SS', el formato con el que se guarda aquí
        r.fecha.replace("T", " ").slice(0, 19),
        r.id_pregunta,
      );
      nuevos += resultado.changes;
    }
  });
  return nuevos;
}

// ---------- Presentación ----------
/** '2026-11-21 23:05:10' (UTC) -> '21/11/2026 17:05' (hora local del dispositivo) */
export function formatearFecha(fecha: string): string {
  const d = new Date(`${fecha.replace(" ", "T")}Z`);
  if (Number.isNaN(d.getTime())) return fecha;
  const dos = (n: number) => String(n).padStart(2, "0");
  return `${dos(d.getDate())}/${dos(d.getMonth() + 1)}/${d.getFullYear()} ${dos(d.getHours())}:${dos(d.getMinutes())}`;
}
