BEGIN TRANSACTION;

CREATE TABLE historial (
	id_registro INTEGER NOT NULL,
	id_pregunta INTEGER NOT NULL,
	correcta INTEGER NOT NULL,
	fecha TEXT DEFAULT (datetime('now')) NOT NULL, id_usuario INTEGER NOT NULL DEFAULT 0,
	CONSTRAINT historial_pk PRIMARY KEY (id_registro),
	CONSTRAINT historial_preguntas_FK FOREIGN KEY (id_pregunta) REFERENCES preguntas(id_pregunta)
);
CREATE TABLE preguntas (
	id_pregunta INTEGER NOT NULL,
	lenguaje TEXT NOT NULL,
	dificultad INTEGER NOT NULL,
	pregunta TEXT NOT NULL,
	id_codigo INTEGER,
	CONSTRAINT preguntas_pk PRIMARY KEY (id_pregunta),
	CONSTRAINT preguntas_codigos_FK FOREIGN KEY (id_codigo) REFERENCES codigos(id_codigo)
);
CREATE TABLE codigos (
	id_codigo INTEGER NOT NULL,
	id_pregunta INTEGER NOT NULL,
	mostrar_num_de_linea BOOLEAN NOT NULL,
	contenido TEXT NOT NULL,
	CONSTRAINT codigos_pk PRIMARY KEY (id_codigo),
	CONSTRAINT codigos_preguntas_FK FOREIGN KEY (id_pregunta) REFERENCES preguntas(id_pregunta)
);
CREATE TABLE respuestas (
	id_respuesta INTEGER NOT NULL,
	id_pregunta INTEGER NOT NULL,
	es_correcta INTEGER NOT NULL,
	respuesta TEXT NOT NULL,
	CONSTRAINT respuestas_pk PRIMARY KEY (id_respuesta),
	CONSTRAINT respuestas_preguntas_FK FOREIGN KEY (id_pregunta) REFERENCES preguntas(id_pregunta)
);
-- dificultad_*: banderas de los niveles activos de cada lenguaje (1 = fácil, 2 = media, 4 = difícil; se suman; 0 = ninguno)
CREATE TABLE usuario (
	id_usuario INTEGER NOT NULL,
	correo_electronico TEXT NOT NULL, dificultad_c INTEGER NOT NULL DEFAULT 1, dificultad_cpp INTEGER NOT NULL DEFAULT 1, dificultad_java INTEGER NOT NULL DEFAULT 1, dificultad_javascript INTEGER NOT NULL DEFAULT 1, dificultad_python INTEGER NOT NULL DEFAULT 1,
	CONSTRAINT usuario_pk PRIMARY KEY (id_usuario)
);
CREATE UNIQUE INDEX usuario_correo_electronico_IDX ON usuario (correo_electronico);
CREATE UNIQUE INDEX historial_unico_IDX ON historial (id_usuario, id_pregunta, fecha);
CREATE INDEX historial_usuario_fecha_IDX ON historial (id_usuario, fecha DESC);


COMMIT;
