-- Esquema SQLite equivalente a datosusuarios (MySQL/MariaDB)
-- Para usar: sqlite3 tu_base.db < datosusuarios_sqlite.sql

PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

-- --------------------------------------------------------
-- Tabla: usuarios
-- --------------------------------------------------------
CREATE TABLE usuarios (
    id_usuario        INTEGER PRIMARY KEY AUTOINCREMENT,
    correo_electronico TEXT NOT NULL UNIQUE,
    contrasena        TEXT NOT NULL,
    intentos_fallidos  INTEGER NOT NULL DEFAULT 0,
    bloqueado_hasta    TEXT,  -- ISO8601 datetime, NULL = no bloqueado
    estado             TEXT NOT NULL DEFAULT 'activa' CHECK (estado IN ('activa','inactiva'))
);

-- --------------------------------------------------------
-- Tabla: tokens
-- --------------------------------------------------------
CREATE TABLE tokens (
    id_token             INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario           INTEGER NOT NULL,
    token                TEXT NOT NULL UNIQUE,
    fecha_hora_expiracion TEXT NOT NULL,  -- ISO8601 datetime
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE INDEX idx_tokens_usuario ON tokens(id_usuario);

-- --------------------------------------------------------
-- Tabla: codigo (códigos de verificación / 2FA)
-- --------------------------------------------------------
CREATE TABLE codigo (
    id_codigo            INTEGER PRIMARY KEY AUTOINCREMENT,
    id_token             INTEGER NOT NULL,
    codigo               TEXT NOT NULL,  -- 6 dígitos
    fecha_hora_expiracion TEXT NOT NULL, -- ISO8601 datetime
    intentos             INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (id_token) REFERENCES tokens(id_token) ON DELETE CASCADE
);

CREATE INDEX idx_codigo_token ON codigo(id_token);

-- --------------------------------------------------------
-- Tabla: historialglobal
-- --------------------------------------------------------
CREATE TABLE historialglobal (
    id_historial   INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario     INTEGER NOT NULL,
    id_pregunta    INTEGER NOT NULL,
    fecha          TEXT NOT NULL,  -- ISO8601 datetime
    correcta       INTEGER NOT NULL CHECK (correcta IN (0,1)),  -- 0/1 boolean
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    UNIQUE(id_usuario, id_pregunta, fecha)
);

CREATE INDEX idx_historial_usuario ON historialglobal(id_usuario);

-- --------------------------------------------------------
-- Tabla: logs
-- --------------------------------------------------------
CREATE TABLE logs (
    id_log     INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,  -- NULL permitido (ON DELETE SET NULL)
    endpoint   TEXT NOT NULL,
    ip         TEXT NOT NULL,
    fecha_hora TEXT NOT NULL DEFAULT (datetime('now')),  -- ISO8601
    accion     TEXT NOT NULL,
    exito      INTEGER NOT NULL CHECK (exito IN (0,1)),  -- 0/1 boolean
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

CREATE INDEX idx_logs_ip_fecha ON logs(ip, fecha_hora);
CREATE INDEX idx_logs_usuario ON logs(id_usuario);

-- --------------------------------------------------------
-- Datos de ejemplo (opcional)
-- --------------------------------------------------------
-- INSERT INTO usuarios (correo_electronico, contrasena) VALUES
-- ('prueba@gmail.com', 'hola123');  -- La contraseña DEBE ir hasheada en producción