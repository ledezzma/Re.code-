# pip install fastapi uvicorn aiosqlite
# Ejecutar con: uvicorn app:app --reload
# CAMBIO: aiosqlite en lugar de mariadb para usar SQLite local

import secrets
from datetime import datetime
from contextlib import asynccontextmanager

# CAMBIO: aiosqlite (async) en lugar de mariadb (sync)
import aiosqlite
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# CAMBIO: Ruta al archivo SQLite local (usa la BD existente servidor.db)
DB_PATH = "servidor.db"


# CAMBIO: Inicializa tablas si no existen (seguro para BD existente: IF NOT EXISTS)
async def init_db():
    async with aiosqlite.connect(DB_PATH) as db:
        await db.executescript("""
            CREATE TABLE IF NOT EXISTS Usuarios (
                id_usuario        INTEGER PRIMARY KEY AUTOINCREMENT,
                correo_electronico TEXT NOT NULL UNIQUE,
                contrasena        TEXT NOT NULL,
                intentos_fallidos  INTEGER NOT NULL DEFAULT 0,
                bloqueado_hasta    TEXT,
                estado             TEXT NOT NULL DEFAULT 'activa' CHECK (estado IN ('activa','inactiva'))
            );

            CREATE TABLE IF NOT EXISTS Tokens (
                id_token             INTEGER PRIMARY KEY AUTOINCREMENT,
                id_usuario           INTEGER NOT NULL,
                token                TEXT NOT NULL UNIQUE,
                fecha_hora_expiracion TEXT NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
            );
            CREATE INDEX IF NOT EXISTS idx_tokens_usuario ON Tokens(id_usuario);

            CREATE TABLE IF NOT EXISTS Codigo (
                id_codigo            INTEGER PRIMARY KEY AUTOINCREMENT,
                id_token             INTEGER NOT NULL,
                codigo               TEXT NOT NULL,
                fecha_hora_expiracion TEXT NOT NULL,
                intentos             INTEGER NOT NULL DEFAULT 0,
                FOREIGN KEY (id_token) REFERENCES Tokens(id_token) ON DELETE CASCADE
            );
            CREATE INDEX IF NOT EXISTS idx_codigo_token ON Codigo(id_token);

            CREATE TABLE IF NOT EXISTS HistorialGlobal (
                id_historial   INTEGER PRIMARY KEY AUTOINCREMENT,
                id_usuario     INTEGER NOT NULL,
                id_pregunta    INTEGER NOT NULL,
                fecha          TEXT NOT NULL,
                correcta       INTEGER NOT NULL CHECK (correcta IN (0,1)),
                FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
                UNIQUE(id_usuario, id_pregunta, fecha)
            );
            CREATE INDEX IF NOT EXISTS idx_historial_usuario ON HistorialGlobal(id_usuario);
        """)
        await db.commit()


# CAMBIO: lifespan para ejecutar init_db al arrancar
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


maximo_intentos_login = 5   #Fallos antes de bloquear la cuenta
bloqueo_minutos = 15

maximo_intentos_codigo = 3   #Máximo de intentos por código de recuperación de contraseña
codigo_minutos = 15

app = FastAPI(lifespan=lifespan)  # CAMBIO: registra lifespan para init_db al arrancar

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Login(BaseModel):
    email: str
    password: str


class Correo(BaseModel):
    email: str


class CambioPw(BaseModel):
    token: str
    codigo: str
    nueva_contrasena: str


class Pregunta(BaseModel):
    id_pregunta: int
    fecha: datetime
    correcta: bool


class Historial(BaseModel):
    historial: list[Pregunta]


# CAMBIO: get_db ahora es async y usa aiosqlite
async def get_db():
    # Abre una conexión nueva a SQLite. Cada endpoint se encarga de cerrarla (async with).
    try:
        db = await aiosqlite.connect(DB_PATH)
        db.row_factory = aiosqlite.Row  # CAMBIO: permite acceder a columnas por nombre
        await db.execute("PRAGMA foreign_keys = ON")  # CAMBIO: activa FKs en SQLite
        await db.execute("PRAGMA journal_mode = WAL")  # CAMBIO: mejor concurrencia
        return db
    except aiosqlite.Error:
        raise HTTPException(503, "La conexión con la base de datos ha fallado")


# CAMBIO: fallar ahora es async porque conn.commit() es await en aiosqlite
async def fallar(conn, codigo_http, mensaje):
    await conn.commit()  # CAMBIO: commit es async en aiosqlite
    raise HTTPException(codigo_http, mensaje)


def enviar_codigo(email, codigo):
    print("Código para ", email, ": ", codigo)


@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API de Re.code()"}


@app.post("/iniciarsesion")
async def iniciar_sesion(datos: Login):
    async with await get_db() as conn:  # CAMBIO: async with para cierre automático
        cur = await conn.cursor()  # CAMBIO: await cursor()
        # CAMBIO: NOW() -> datetime('now'), > datetime('now') para comparar fechas
        await cur.execute(
            "SELECT id_usuario, contrasena, bloqueado_hasta > datetime('now') FROM Usuarios "
            "WHERE correo_electronico = ? AND estado = 'activa'",
            (datos.email.lower(),),
        )
        fila = await cur.fetchone()  # CAMBIO: await fetchone()
        if fila is None:
            raise HTTPException(401, "Correo o contraseña incorrectos")

        id_usuario, contrasena, bloqueado = fila

        if bloqueado:
            raise HTTPException(429, "Demasiados intentos. Prueba en unos minutos")

        if contrasena != datos.password:
            # CAMBIO: IF -> CASE WHEN, DATE_ADD -> datetime('now', '+' || ? || ' minutes')
            await cur.execute(
                "UPDATE Usuarios SET "
                "bloqueado_hasta = CASE WHEN intentos_fallidos + 1 >= ? "
                "THEN datetime('now', '+' || ? || ' minutes') ELSE bloqueado_hasta END, "
                "intentos_fallidos = CASE WHEN intentos_fallidos + 1 >= ? THEN 0 ELSE intentos_fallidos + 1 END "
                "WHERE id_usuario = ?",
                (maximo_intentos_login, bloqueo_minutos, maximo_intentos_login, id_usuario),
            )
            await fallar(conn, 401, "Correo o contraseña incorrectos")  # CAMBIO: await fallar()

        await cur.execute(
            "UPDATE Usuarios SET intentos_fallidos = 0, bloqueado_hasta = NULL WHERE id_usuario = ?",
            (id_usuario,),
        )
        await conn.commit()  # CAMBIO: await commit()
        return {"message": "Inicio de sesion exitoso", "id_usuario": id_usuario}


@app.post("/registrar", status_code=201)
async def registrar(datos: Login):
    async with await get_db() as conn:
        cur = await conn.cursor()
        try:
            await cur.execute(
                "INSERT INTO Usuarios (correo_electronico, contrasena) VALUES (?, ?)",
                (datos.email.lower(), datos.password),
            )
        except aiosqlite.IntegrityError:  # CAMBIO: aiosqlite.IntegrityError en lugar de mariadb
            raise HTTPException(409, "Ese correo ya está registrado")
        await conn.commit()
        return {"message": "Cuenta creada", "id_usuario": cur.lastrowid}


@app.post("/intentoCambiarPw")
async def intento_cambiar_pw(datos: Correo):
    mensaje = "Si la cuenta existe, se ha enviado un código al correo"
    #Si el correo no existe devolvemos lo mismo, con un token falso
    respuesta_falsa = {"message": mensaje, "token": secrets.token_urlsafe(32)}

    async with await get_db() as conn:
        cur = await conn.cursor()
        await cur.execute(
            "SELECT id_usuario FROM Usuarios WHERE correo_electronico = ? AND estado = 'activa'",
            (datos.email.lower(),),
        )
        fila = await cur.fetchone()
        if fila is None:
            return respuesta_falsa
        id_usuario = fila[0]

        #Se limpian los tokens caducados y, si queda uno vigente, no se crea otro, así no se pueden pedir códigos sin fin para seguir probando.
        # CAMBIO: NOW() -> datetime('now')
        await cur.execute("DELETE FROM Tokens WHERE id_usuario = ? AND fecha_hora_expiracion <= datetime('now')", (id_usuario,))
        await cur.execute("SELECT 1 FROM Tokens WHERE id_usuario = ?", (id_usuario,))
        if await cur.fetchone():
            await conn.commit()
            return respuesta_falsa

        token = secrets.token_urlsafe(32)
        # CAMBIO: DATE_ADD -> datetime('now', '+' || ? || ' minutes')
        await cur.execute(
            "INSERT INTO Tokens (id_usuario, token, fecha_hora_expiracion) "
            "VALUES (?, ?, datetime('now', '+' || ? || ' minutes'))",
            (id_usuario, token, codigo_minutos),
        )
        id_token = cur.lastrowid

        codigo = f"{secrets.randbelow(1000000):06d}"
        # CAMBIO: DATE_ADD -> datetime('now', '+' || ? || ' minutes')
        await cur.execute(
            "INSERT INTO Codigo (id_token, codigo, fecha_hora_expiracion) "
            "VALUES (?, ?, datetime('now', '+' || ? || ' minutes'))",
            (id_token, codigo, codigo_minutos),
        )
        await conn.commit()

        enviar_codigo(datos.email, codigo)
        return {"message": mensaje, "token": token}


@app.post("/cambiarcontrasena")
async def cambiar_contrasena(datos: CambioPw):
    error = "Token o código inválido, o expirado"
    async with await get_db() as conn:
        cur = await conn.cursor()

        # CAMBIO: NOW() -> datetime('now')
        await cur.execute(
            "SELECT id_token, id_usuario FROM Tokens WHERE token = ? AND fecha_hora_expiracion > datetime('now')",
            (datos.token,),
        )
        fila = await cur.fetchone()
        if fila is None:
            raise HTTPException(400, error)
        id_token, id_usuario = fila

        await cur.execute(
            "SELECT id_codigo, codigo FROM Codigo "
            "WHERE id_token = ? AND intentos < ? AND fecha_hora_expiracion > datetime('now')",
            (id_token, maximo_intentos_codigo),
        )
        fila = await cur.fetchone()
        if fila is None:
            raise HTTPException(400, error)
        id_codigo, codigo_guardado = fila

        #Se gasta el intento ANTES de comparar
        await cur.execute(
            "UPDATE Codigo SET intentos = intentos + 1 WHERE id_codigo = ? AND intentos < ?",
            (id_codigo, maximo_intentos_codigo),
        )
        if cur.rowcount == 0 or codigo_guardado != datos.codigo:
            await fallar(conn, 400, error)  # CAMBIO: await fallar()

        await cur.execute(
            "UPDATE Usuarios SET contrasena = ?, intentos_fallidos = 0, bloqueado_hasta = NULL "
            "WHERE id_usuario = ?",
            (datos.nueva_contrasena, id_usuario),
        )
        await cur.execute("DELETE FROM Tokens WHERE id_usuario = ?", (id_usuario,))  #Borra también el código
        await conn.commit()
        return {"message": "Contraseña actualizada"}


@app.post("/eliminarcuenta/{id_usuario}")
async def eliminar_cuenta(id_usuario: int):
    async with await get_db() as conn:
        cur = await conn.cursor()
        await cur.execute(
            "UPDATE Usuarios SET estado = 'inactiva' WHERE id_usuario = ? AND estado = 'activa'",
            (id_usuario,),
        )
        if cur.rowcount == 0:
            raise HTTPException(404, "No existe esa cuenta")
        await cur.execute("DELETE FROM Tokens WHERE id_usuario = ?", (id_usuario,))
        await conn.commit()
        return {"message": "Cuenta eliminada"}


@app.post("/cargarHistorial/{id_usuario}")
async def cargar_historial(id_usuario: int, datos: Historial):
    async with await get_db() as conn:
        cur = await conn.cursor()
        await cur.execute("SELECT * FROM Usuarios WHERE id_usuario = ? AND estado = 'activa'", (id_usuario,))
        if await cur.fetchone() is None:
            raise HTTPException(404, "No existe esa cuenta")

        # CAMBIO: p.fecha.isoformat() y 1/0 en lugar de bool
        filas = [
            (id_usuario, p.id_pregunta, p.fecha.isoformat(), 1 if p.correcta else 0)
            for p in datos.historial
        ]
        if filas:
            # CAMBIO: INSERT IGNORE -> INSERT OR IGNORE (SQLite)
            await cur.executemany(
                "INSERT OR IGNORE INTO HistorialGlobal (id_usuario, id_pregunta, fecha, correcta) "
                "VALUES (?, ?, ?, ?)",
                filas,
            )
        await conn.commit()
        return {"message": "Historial cargado correctamente", "recibidos": len(filas)}