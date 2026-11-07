BEGIN TRANSACTION;
CREATE TABLE historial (
	id_registro INTEGER NOT NULL,
	id_pregunta INTEGER NOT NULL,
	correcta INTEGER NOT NULL,
	fecha TEXT DEFAULT (datetime('now')) NOT NULL,
	CONSTRAINT historial_pk PRIMARY KEY (id_registro),
	CONSTRAINT historial_preguntas_FK FOREIGN KEY (id_pregunta) REFERENCES preguntas(id_pregunta)
);
CREATE TABLE lenguajes (
	id_lenguaje INTEGER NOT NULL,
	lenguaje TEXT NOT NULL,
	ruta_imagen TEXT NOT NULL,
	CONSTRAINT lenguajes_pk PRIMARY KEY (id_lenguaje)
);
CREATE TABLE preguntas (
	id_pregunta INTEGER NOT NULL,
	id_lenguaje INTEGER NOT NULL,
	dificultad TEXT NOT NULL,
	pregunta TEXT NOT NULL,
	codigo TEXT,
	mostrar_num_de_linea INTEGER NOT NULL,
	CONSTRAINT preguntas_pk PRIMARY KEY (id_pregunta),
	CONSTRAINT preguntas_lenguajes_FK FOREIGN KEY (id_lenguaje) REFERENCES lenguajes(id_lenguaje)
);
CREATE TABLE respuestas (
	id_pregunta INTEGER NOT NULL,
	id_respuesta INTEGER NOT NULL,
	es_correcta INTEGER NOT NULL,
	respuesta TEXT NOT NULL,
	CONSTRAINT respuestas_pk PRIMARY KEY (id_respuesta),
	CONSTRAINT respuestas_preguntas_FK FOREIGN KEY (id_pregunta) REFERENCES preguntas(id_pregunta)
);
CREATE TABLE usuario (
	id_usuario INTEGER NOT NULL,
	correo_electronico TEXT NOT NULL,
	contraseña TEXT NOT NULL,
	CONSTRAINT usuario_pk PRIMARY KEY (id_usuario)
);
CREATE UNIQUE INDEX usuario_correo_electronico_IDX ON usuario (correo_electronico);
COMMIT;
