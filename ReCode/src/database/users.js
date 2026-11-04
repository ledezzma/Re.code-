// src/database/users.js
import * as Crypto from "expo-crypto";

const PEPPER = "recode_2026";

// ---------- Helppers ----------
async function hashWithSalt(password, salt) {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password + salt + PEPPER
  );
}

async function randomSalt() {
  const bytes = await Crypto.getRandomBytesAsync(16);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ---------- API pública ----------
export async function registrarUsuario(db, correo, contraseña) {
  const email = correo.trim().toLowerCase();
  if (!email.includes('@')) return { ok: false, error: "INVALID_EMAIL" };
  if (contraseña.length < 8) return { ok: false, error: "WEAK_PASSWORD" };

  const salt = await randomSalt();
  const hash = await hashWithSalt(contraseña, salt);
  const stored = `${salt}:${hash}`;

  try {
    const result = await db.runAsync(
      "INSERT INTO usuarios (correo_electronico, contrasena) VALUES (?, ?)",
      email, stored
    );
    return { ok: true, userId: result.lastInsertRowId };
  } catch (e) {
    if (String(e.message).includes("UNIQUE")) return { ok: false, error: "EMAIL_EXISTS" };
    throw e;
  }
}

export async function loginUsuario(db, correo, contraseña) {
  const email = correo.trim().toLowerCase();
  const row = await db.getFirstAsync(
    "SELECT id_usuario, contrasena FROM usuarios WHERE correo_electronico = ?",
    email
  );
  if (!row) return { ok: false, error: "INVALID_CREDENTIALS" };

  const [salt, hash] = row.contrasena.split(':');
  if (!salt || !hash) return { ok: false, error: "INVALID_CREDENTIALS" };

  const testHash = await hashWithSalt(contraseña, salt);
  if (testHash !== hash) return { ok: false, error: "INVALID_CREDENTIALS" };

  return { ok: true, userId: row.id_usuario };
}