// src/database/init.js
// Inicializa las tablas SQLite al arrancar la app
// Uso: await initDB(db) al abrir la conexión

export async function initDB(db) {
  await db.execAsync(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;

    -- usuarios
    CREATE TABLE IF NOT EXISTS usuarios (
      id_usuario        INTEGER PRIMARY KEY AUTOINCREMENT,
      correo_electronico TEXT NOT NULL UNIQUE,
      contrasena        TEXT NOT NULL,
      intentos_fallidos  INTEGER NOT NULL DEFAULT 0,
      bloqueado_hasta    TEXT,
      estado             TEXT NOT NULL DEFAULT 'activa' CHECK (estado IN ('activa','inactiva'))
    );

    -- tokens (sesiones / refresh tokens)
    CREATE TABLE IF NOT EXISTS tokens (
      id_token             INTEGER PRIMARY KEY AUTOINCREMENT,
      id_usuario           INTEGER NOT NULL,
      token                TEXT NOT NULL UNIQUE,
      fecha_hora_expiracion TEXT NOT NULL,
      FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_tokens_usuario ON tokens(id_usuario);

    -- codigo (2FA / verificación email)
    CREATE TABLE IF NOT EXISTS codigo (
      id_codigo            INTEGER PRIMARY KEY AUTOINCREMENT,
      id_token             INTEGER NOT NULL,
      codigo               TEXT NOT NULL,
      fecha_hora_expiracion TEXT NOT NULL,
      intentos             INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (id_token) REFERENCES tokens(id_token) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_codigo_token ON codigo(id_token);

    -- historialglobal (respuestas del usuario)
    CREATE TABLE IF NOT EXISTS historialglobal (
      id_historial   INTEGER PRIMARY KEY AUTOINCREMENT,
      id_usuario     INTEGER NOT NULL,
      id_pregunta    INTEGER NOT NULL,
      fecha          TEXT NOT NULL,
      correcta       INTEGER NOT NULL CHECK (correcta IN (0,1)),
      FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
      UNIQUE(id_usuario, id_pregunta, fecha)
    );
    CREATE INDEX IF NOT EXISTS idx_historial_usuario ON historialglobal(id_usuario);

    -- logs (auditoría)
    CREATE TABLE IF NOT EXISTS logs (
      id_log     INTEGER PRIMARY KEY AUTOINCREMENT,
      id_usuario INTEGER,
      endpoint   TEXT NOT NULL,
      ip         TEXT NOT NULL,
      fecha_hora TEXT NOT NULL DEFAULT (datetime('now')),
      accion     TEXT NOT NULL,
      exito      INTEGER NOT NULL CHECK (exito IN (0,1)),
      FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
    );
    CREATE INDEX IF NOT EXISTS idx_logs_ip_fecha ON logs(ip, fecha_hora);
    CREATE INDEX IF NOT EXISTS idx_logs_usuario ON logs(id_usuario);
  `);
}