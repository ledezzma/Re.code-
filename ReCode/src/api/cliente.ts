import { getAPIUrl } from "../../utils/networkConnection";

const TIMEOUT_MS = 10000;

export type RespuestaAPI<T> = {
  ok: boolean;
  status: number;
  data: T;
};

/** Mensajes que la API devuelve como texto (con status 200) cuando una operación sale bien. */
export const MENSAJES_API = {
  contrasenaActualizada: "Contraseña actualizada",
  cuentaEliminada: "Cuenta eliminada",
  historialCargado: "Historial cargado correctamente",
} as const;

/**
 * Llama a la API de Re.code(). Lanza un Error con un mensaje legible si no hay conexión
 * o el servidor no responde a tiempo; los errores HTTP (401, 429...) se devuelven en `ok`/`status`.
 */
export async function llamarAPI<T = any>(
  ruta: string,
  opciones: { metodo?: "GET" | "POST"; cuerpo?: unknown } = {},
): Promise<RespuestaAPI<T>> {
  const { metodo = "POST", cuerpo } = opciones;
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_MS);
  try {
    const base = await getAPIUrl();
    const respuesta = await fetch(`${base}${ruta}`, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo),
      signal: controlador.signal,
    });
    let data: any = null;
    try {
      data = await respuesta.json();
    } catch {
      // respuesta sin JSON: se deja data en null
    }
    return { ok: respuesta.ok, status: respuesta.status, data };
  } catch {
    throw new Error("No se pudo conectar al servidor");
  } finally {
    clearTimeout(temporizador);
  }
}

/** Texto de error de una respuesta de la API (FastAPI manda `detail`; algunas rutas, `message`). */
export function mensajeDeError(r: RespuestaAPI<any>, porDefecto: string): string {
  const detalle = r.data?.detail;
  if (typeof detalle === "string") return detalle;
  if (typeof r.data?.message === "string") return r.data.message;
  return porDefecto;
}
