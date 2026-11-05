# pip install fastapi uvicorn mariadb
# Ejecutar con: uvicorn main:app --reload

import secrets
from datetime import datetime

import mariadb
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

maximo_intentos_login = 5   #Fallos antes de bloquear la cuenta
bloqueo_minutos = 15

maximo_intentos_codigo = 3   #Máximo de intentos por código de recuperación de contraseña
codigo_minutos = 15

app = FastAPI()

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


def get_db():
    #Abre una conexión nueva. Cada endpoint se encarga de cerrarla.
    try:
        return mariadb.connect(host="127.0.0.1", port=3306, user="root", password="", database="servidor")
    except mariadb.Error:
        raise HTTPException(503, "La conexión con la base de datos ha fallado")


def fallar(conn, codigo_http, mensaje):
    conn.commit()  #Guarda el intento fallido que se acaba de sumar
    raise HTTPException(codigo_http, mensaje)


def enviar_codigo(email, codigo):
    print("Código para ", email, ": ", codigo)


@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API de Re.code()"}


@app.post("/iniciarsesion")
def iniciar_sesion(datos: Login):
    conn = get_db()
    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT id_usuario, contrasena, bloqueado_hasta > NOW() FROM Usuarios "
            "WHERE correo_electronico = ? AND estado = 'activa'",
            (datos.email.lower(),),
        )
        fila = cur.fetchone()
        if fila is None:
            raise HTTPException(401, "Correo o contraseña incorrectos")

        id_usuario, contrasena, bloqueado = fila

        if bloqueado:
            raise HTTPException(429, "Demasiados intentos. Prueba en unos minutos")

        if contrasena != datos.password:
            #Suma el fallo si las contraseñas no coinciden, en caso de que se llegue al máximo bloquea la cuenta por 15 minutos
            cur.execute(
                "UPDATE Usuarios SET "
                "bloqueado_hasta = IF(intentos_fallidos + 1 >= ?, DATE_ADD(NOW(), INTERVAL ? MINUTE), bloqueado_hasta), "
                "intentos_fallidos = IF(intentos_fallidos + 1 >= ?, 0, intentos_fallidos + 1) "
                "WHERE id_usuario = ?",
                (maximo_intentos_login, bloqueo_minutos, maximo_intentos_login, id_usuario),
            )
            fallar(conn, 401, "Correo o contraseña incorrectos")

        cur.execute(
            "UPDATE Usuarios SET intentos_fallidos = 0, bloqueado_hasta = NULL WHERE id_usuario = ?",
            (id_usuario,),
        )
        conn.commit()
        return {"message": "Inicio de sesion exitoso", "id_usuario": id_usuario}
    finally:
        conn.close()


@app.post("/registrar", status_code=201)
def registrar(datos: Login):
    conn = get_db()
    try:
        cur = conn.cursor()
        try:
            cur.execute(
                "INSERT INTO Usuarios (correo_electronico, contrasena) VALUES (?, ?)",
                (datos.email.lower(), datos.password),
            )
        except mariadb.IntegrityError:
            raise HTTPException(409, "Ese correo ya está registrado")
        conn.commit()
        return {"message": "Cuenta creada", "id_usuario": cur.lastrowid}
    finally:
        conn.close()


@app.post("/intentoCambiarPw")
def intento_cambiar_pw(datos: Correo):
    mensaje = "Si la cuenta existe, se ha enviado un código al correo"
    #Si el correo no existe devolvemos lo mismo, con un token falso
    respuesta_falsa = {"message": mensaje, "token": secrets.token_urlsafe(32)}

    conn = get_db()
    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT id_usuario FROM Usuarios WHERE correo_electronico = ? AND estado = 'activa'",
            (datos.email.lower(),),
        )
        fila = cur.fetchone()
        if fila is None:
            return respuesta_falsa
        id_usuario = fila[0]

        #Se limpian los tokens caducados y, si queda uno vigente, no se crea otro, así no se pueden pedir códigos sin fin para seguir probando.
        cur.execute("DELETE FROM Tokens WHERE id_usuario = ? AND fecha_hora_expiracion <= NOW()", (id_usuario,))
        cur.execute("SELECT 1 FROM Tokens WHERE id_usuario = ?", (id_usuario,))
        if cur.fetchone():
            conn.commit()
            return respuesta_falsa

        token = secrets.token_urlsafe(32)
        cur.execute(
            "INSERT INTO Tokens (id_usuario, token, fecha_hora_expiracion) "
            "VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? MINUTE))",
            (id_usuario, token, codigo_minutos),
        )
        id_token = cur.lastrowid

        codigo = f"{secrets.randbelow(1000000):06d}"
        cur.execute(
            "INSERT INTO Codigo (id_token, codigo, fecha_hora_expiracion) "
            "VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? MINUTE))",
            (id_token, codigo, codigo_minutos),
        )
        conn.commit()

        enviar_codigo(datos.email, codigo)
        return {"message": mensaje, "token": token}
    finally:
        conn.close()


@app.post("/cambiarcontrasena")
def cambiar_contrasena(datos: CambioPw):
    error = "Token o código inválido, o expirado"
    conn = get_db()
    try:
        cur = conn.cursor()

        cur.execute(
            "SELECT id_token, id_usuario FROM Tokens WHERE token = ? AND fecha_hora_expiracion > NOW()",
            (datos.token,),
        )
        fila = cur.fetchone()
        if fila is None:
            raise HTTPException(400, error)
        id_token, id_usuario = fila

        cur.execute(
            "SELECT id_codigo, codigo FROM Codigo "
            "WHERE id_token = ? AND intentos < ? AND fecha_hora_expiracion > NOW()",
            (id_token, maximo_intentos_codigo),
        )
        fila = cur.fetchone()
        if fila is None:
            raise HTTPException(400, error)
        id_codigo, codigo_guardado = fila

        #Se gasta el intento ANTES de comparar
        cur.execute(
            "UPDATE Codigo SET intentos = intentos + 1 WHERE id_codigo = ? AND intentos < ?",
            (id_codigo, maximo_intentos_codigo),
        )
        if cur.rowcount == 0 or codigo_guardado != datos.codigo:
            fallar(conn, 400, error)

        cur.execute(
            "UPDATE Usuarios SET contrasena = ?, intentos_fallidos = 0, bloqueado_hasta = NULL "
            "WHERE id_usuario = ?",
            (datos.nueva_contrasena, id_usuario),
        )
        cur.execute("DELETE FROM Tokens WHERE id_usuario = ?", (id_usuario,))  #Borra también el código
        conn.commit()
        return {"message": "Contraseña actualizada"}
    finally:
        conn.close()


@app.post("/eliminarcuenta/{id_usuario}")
def eliminar_cuenta(id_usuario: int):
    conn = get_db()
    try:
        cur = conn.cursor()
        cur.execute(
            "UPDATE Usuarios SET estado = 'inactiva' WHERE id_usuario = ? AND estado = 'activa'",
            (id_usuario,),
        )
        if cur.rowcount == 0:
            raise HTTPException(404, "No existe esa cuenta")
        cur.execute("DELETE FROM Tokens WHERE id_usuario = ?", (id_usuario,))
        conn.commit()
        return {"message": "Cuenta eliminada"}
    finally:
        conn.close()


@app.post("/cargarHistorial/{id_usuario}")
def cargar_historial(id_usuario: int, datos: Historial):
    conn = get_db()
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM Usuarios WHERE id_usuario = ? AND estado = 'activa'", (id_usuario,))
        if cur.fetchone() is None:
            raise HTTPException(404, "No existe esa cuenta")

        filas = [
            (id_usuario, p.id_pregunta, p.fecha.replace(tzinfo=None), p.correcta)
            for p in datos.historial
        ]
        if filas:
            #Con INSERT IGNORE se ignoran los registros repetidos
            cur.executemany(
                "INSERT IGNORE INTO HistorialGlobal (id_usuario, id_pregunta, fecha, correcta) "
                "VALUES (?, ?, ?, ?)",
                filas,
            )
        conn.commit()
        return {"message": "Historial cargado correctamente", "recibidos": len(filas)}
    finally:
        conn.close()