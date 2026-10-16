import * as Crypto from "expo-crypto";

const extra = "recode_2026";

async function hash(passwd) {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    passwd + extra,
  );
}

export async function registrarUsuario(db, correo, contraseña) {
  const passHash = await hash(contraseña);

  try {
    return db.runAsync(
      "INSERT INTO usuario (correo_electronico, contraseña) VALUES (?, ?)",
      correo.trim().toLowerCase(),
      passHash,
    );
  } catch (e) {
    if (String(e.message).includes("UNIQUE"))
      throw new Error(" Correo Duplicado");
    throw e;
  }
}
