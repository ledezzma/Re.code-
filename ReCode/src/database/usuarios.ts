import * as SecureStore from "expo-secure-store";
import type { SQLiteDatabase } from "expo-sqlite";
import {
  COLUMNA_DIFICULTAD,
  ID_INVITADO,
  LENGUAJES,
  configPorDefecto,
  type ConfigPreguntas,
  TODAS_LAS_BANDERAS,
} from "../game/constantes";

/** Quién está usando la app: una cuenta (id del servidor) o el invitado (id 0). */
export type Sesion = {
  id: number;
  correo: string | null;
  esInvitado: boolean;
};

const CLAVE_ID = "userId";
const CLAVE_CORREO = "userEmail";

const INVITADO: Sesion = { id: ID_INVITADO, correo: null, esInvitado: true };

// ---------- Sesión (SecureStore) ----------
export async function obtenerSesion(): Promise<Sesion> {
  try {
    const [id, correo] = await Promise.all([
      SecureStore.getItemAsync(CLAVE_ID),
      SecureStore.getItemAsync(CLAVE_CORREO),
    ]);
    const n = Number(id);
    if (!id || !Number.isInteger(n) || n <= 0) return INVITADO;
    return { id: n, correo, esInvitado: false };
  } catch {
    return INVITADO;
  }
}

/** Guarda la sesión y crea (si falta) la fila local del usuario. */
export async function guardarSesion(db: SQLiteDatabase, id: number, correo: string) {
  const email = correo.trim().toLowerCase();
  await asegurarUsuarioLocal(db, id, email);
  await SecureStore.setItemAsync(CLAVE_ID, String(id));
  await SecureStore.setItemAsync(CLAVE_CORREO, email);
}

/** Cierra la sesión: la app pasa a modo invitado. */
export async function cerrarSesion() {
  await SecureStore.deleteItemAsync(CLAVE_ID);
  await SecureStore.deleteItemAsync(CLAVE_CORREO);
}

// ---------- Fila local del usuario ----------
export async function asegurarUsuarioLocal(db: SQLiteDatabase, id: number, correo: string) {
  await db.withTransactionAsync(async () => {
    // Si el correo lo tenía otra fila (cuenta eliminada y vuelta a crear con otro id),
    // se descarta esa fila vieja y su historial para no mezclar datos de dos cuentas.
    const viejas = await db.getAllAsync<{ id_usuario: number }>(
      "SELECT id_usuario FROM usuario WHERE correo_electronico = ? AND id_usuario != ?",
      correo,
      id,
    );
    for (const { id_usuario } of viejas) await borrarFilasDeUsuario(db, id_usuario);

    await db.runAsync(
      "INSERT OR IGNORE INTO usuario (id_usuario, correo_electronico) VALUES (?, ?)",
      id,
      correo,
    );
  });
}

async function borrarFilasDeUsuario(db: SQLiteDatabase, id: number) {
  await db.runAsync("DELETE FROM historial WHERE id_usuario = ?", id);
  await db.runAsync("DELETE FROM usuario WHERE id_usuario = ?", id);
}

/** Borra de este dispositivo todo lo de una cuenta (configuración e historial) y su sesión. */
export async function eliminarUsuarioLocal(db: SQLiteDatabase, id: number) {
  if (id !== ID_INVITADO) await borrarFilasDeUsuario(db, id);
  await cerrarSesion();
}

// ---------- Configuración de preguntas ----------
export async function obtenerConfig(db: SQLiteDatabase, idUsuario: number): Promise<ConfigPreguntas> {
  const fila = await db.getFirstAsync<Record<string, number>>(
    `SELECT ${Object.values(COLUMNA_DIFICULTAD).join(", ")} FROM usuario WHERE id_usuario = ?`,
    idUsuario,
  );
  const config = configPorDefecto();
  if (!fila) return config;
  for (const lenguaje of LENGUAJES) {
    const valor = Number(fila[COLUMNA_DIFICULTAD[lenguaje]]);
    if (Number.isInteger(valor) && valor >= 0 && valor <= TODAS_LAS_BANDERAS) config[lenguaje] = valor;
  }
  return config;
}

export async function guardarConfig(db: SQLiteDatabase, sesion: Sesion, config: ConfigPreguntas) {
  // La fila local se crea aquí, la primera vez que hace falta (invitado o cuenta); no se siembra nada
  await asegurarUsuarioLocal(db, sesion.id, sesion.correo ?? "invitado");
  const asignaciones = LENGUAJES.map((l) => `${COLUMNA_DIFICULTAD[l]} = ?`).join(", ");
  await db.runAsync(
    `UPDATE usuario SET ${asignaciones} WHERE id_usuario = ?`,
    ...LENGUAJES.map((l) => config[l] & TODAS_LAS_BANDERAS),
    sesion.id,
  );
}
