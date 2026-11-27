import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import Boton from "../components/Boton";
import Encabezado from "../components/Encabezado";
import Pregunta from "../components/Pregunta";
import SeleccionPregunta from "../components/SeleccionPregunta";
import { Modal, useModal } from "../components/Modal";
import { armarPartida, type Ronda } from "../game/armarPartida";
import {
  ID_INVITADO,
  PISTAS_POR_PARTIDA,
  SEGUNDOS_POR_PREGUNTA,
  type Modo,
} from "../game/constantes";
import { cargarBanco, type PreguntaJuego } from "../database/preguntas";
import { registrarRespuesta } from "../database/historial";
import { obtenerConfig, obtenerSesion } from "../database/usuarios";
import { preguntaStyles } from "../styles";

type Fase = "cargando" | "sinPreguntas" | "error" | "jugando" | "fin";

interface Estado {
  fase: Fase;
  rondas: Ronda[];
  indice: number;
  /** Pregunta que se está respondiendo; null mientras se elige (modo previsor) */
  elegida: PreguntaJuego | null;
  seleccion: number | null;
  confirmada: boolean;
  ocultas: number[];
  pistas: number;
  aciertos: number;
  /** Momento (ms) en que se agota el tiempo de la pregunta actual (solo contrarreloj) */
  limite: number | null;
}

const ESTADO_INICIAL: Estado = {
  fase: "cargando",
  rondas: [],
  indice: 0,
  elegida: null,
  seleccion: null,
  confirmada: false,
  ocultas: [],
  pistas: PISTAS_POR_PARTIDA,
  aciertos: 0,
  limite: null,
};

/** Estado al empezar la ronda `indice` (sin tocar pistas ni aciertos). */
function enRonda(e: Estado, indice: number, modo: Modo, ahora: number): Estado {
  const contrarreloj = modo === "contrarreloj";
  return {
    ...e,
    fase: "jugando",
    indice,
    elegida: contrarreloj ? e.rondas[indice][0] : null,
    seleccion: null,
    confirmada: false,
    ocultas: [],
    limite: contrarreloj ? ahora + SEGUNDOS_POR_PREGUNTA * 1000 : null,
  };
}

export default function PreguntaScreen() {
  const { modo: parametroModo } = useLocalSearchParams<{ modo?: string }>();
  const modo: Modo = parametroModo === "previsor" ? "previsor" : "contrarreloj";
  const db = useSQLiteContext();
  const router = useRouter();

  const [estado, setEstado] = useState<Estado>(ESTADO_INICIAL);
  const [segundos, setSegundos] = useState(SEGUNDOS_POR_PREGUNTA);
  const idUsuario = useRef(ID_INVITADO);
  /** Evita registrar dos veces la misma pregunta (doble toque / tiempo agotado a la vez) */
  const cerrada = useRef(false);
  const { modalConfig, modalVisible, showModal, dismissModal } = useModal();

  const { fase, rondas, indice, elegida, seleccion, confirmada, ocultas, pistas, aciertos, limite } = estado;

  const volverAlHome = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/home");
  };

  // ---------- Inicio: las preguntas se sortean aquí, al empezar el modo de juego ----------
  useEffect(() => {
    let activo = true;
    (async () => {
      const sesion = await obtenerSesion();
      const config = await obtenerConfig(db, sesion.id);
      const partida = armarPartida(modo, await cargarBanco(db, config));
      if (!activo) return;
      idUsuario.current = sesion.id;
      cerrada.current = false;
      if (partida.length === 0) {
        setEstado({ ...ESTADO_INICIAL, fase: "sinPreguntas" });
        return;
      }
      setSegundos(SEGUNDOS_POR_PREGUNTA);
      setEstado(enRonda({ ...ESTADO_INICIAL, rondas: partida }, 0, modo, Date.now()));
    })().catch((e) => {
      console.warn("No se pudo armar la partida:", e);
      if (activo) setEstado({ ...ESTADO_INICIAL, fase: "error" });
    });
    return () => {
      activo = false;
    };
  }, [db, modo]);

  // ---------- Cronómetro (contrarreloj) ----------
  // Se guarda la última versión del manejador para que el temporizador no use datos viejos
  const alAgotarseElTiempo = useRef<() => void>(() => {});
  useEffect(() => {
    alAgotarseElTiempo.current = async () => {
      if (cerrada.current || !elegida) return;
      cerrada.current = true;
      // La pregunta cuenta como fallida y se regresa al home
      try {
        await registrarRespuesta(db, idUsuario.current, elegida.id, false);
      } catch (e) {
        console.warn("No se pudo guardar en el historial:", e);
      }
      // Primero mostramos el modal, esperamos a que el usuario lo cierre, luego navegamos
      await showModal({
        title: "Tiempo agotado",
        message: "La pregunta se marcó como fallida.",
        type: "warning",
        confirmText: "Entendido",
      });
      volverAlHome();
    };
  });

  useEffect(() => {
    if (modo !== "contrarreloj" || limite === null || !elegida || confirmada) return;
    const actualizar = () => {
      const restante = Math.max(0, Math.ceil((limite - Date.now()) / 1000));
      setSegundos(restante);
      if (restante === 0) {
        clearInterval(intervalo);
        alAgotarseElTiempo.current();
      }
    };
    const intervalo = setInterval(actualizar, 250);
    actualizar();
    return () => clearInterval(intervalo);
  }, [modo, limite, elegida, confirmada]);

  // ---------- Acciones ----------
  const elegirCandidata = (pregunta: PreguntaJuego) => {
    setEstado((e) => ({ ...e, elegida: pregunta, seleccion: null, confirmada: false, ocultas: [] }));
  };

  const seleccionar = (i: number) => {
    setEstado((e) => (e.confirmada ? e : { ...e, seleccion: i }));
  };

  const usarPista = () => {
    setEstado((e) => {
      if (!e.elegida || e.confirmada || e.pistas <= 0) return e;
      const visibles = e.elegida.respuestas.map((_, i) => i).filter((i) => !e.ocultas.includes(i));
      if (visibles.length <= 2) return e;
      const descartables = visibles.filter((i) => !e.elegida!.respuestas[i].correcta && i !== e.seleccion);
      if (descartables.length === 0) return e;
      const quitar = descartables[Math.floor(Math.random() * descartables.length)];
      return { ...e, ocultas: [...e.ocultas, quitar], pistas: e.pistas - 1 };
    });
  };

  const confirmar = async () => {
    if (!elegida || seleccion === null || cerrada.current) return;
    cerrada.current = true;
    const correcta = elegida.respuestas[seleccion]?.correcta === true;
    setEstado((e) => ({ ...e, confirmada: true, aciertos: e.aciertos + (correcta ? 1 : 0) }));
    try {
      await registrarRespuesta(db, idUsuario.current, elegida.id, correcta);
    } catch (e) {
      console.warn("No se pudo guardar en el historial:", e);
    }
  };

  const siguiente = () => {
    cerrada.current = false;
    setSegundos(SEGUNDOS_POR_PREGUNTA);
    const ahora = Date.now();
    setEstado((e) =>
      e.indice + 1 >= e.rondas.length ? { ...e, fase: "fin" } : enRonda(e, e.indice + 1, modo, ahora),
    );
  };

  // ---------- Pantallas ----------
  if (fase === "cargando") {
    return (
      <>
        <LinearGradient colors={["#0C0C14", "#1a1a2e"]} style={preguntaStyles.gradient}>
          <Encabezado titulo="Preparando partida" />
          <View style={preguntaStyles.centrado}>
            <ActivityIndicator size="large" color="#7C5CFF" />
          </View>
        </LinearGradient>
        {modalConfig && (
          <Modal
            visible={modalVisible}
            config={modalConfig}
            onDismiss={dismissModal}
          />
        )}
      </>
    );
  }

  if (fase === "sinPreguntas" || fase === "error") {
    return (
      <>
        <LinearGradient colors={["#0C0C14", "#1a1a2e"]} style={preguntaStyles.gradient}>
          <Encabezado titulo="Partida" />
          <View style={preguntaStyles.centrado}>
            <Text style={preguntaStyles.mensaje}>
              {fase === "error"
                ? "No se pudo preparar la partida."
                : "No hay preguntas con la configuración actual."}
            </Text>
            <Boton texto="Volver" onPress={volverAlHome} />
          </View>
        </LinearGradient>
        {modalConfig && (
          <Modal
            visible={modalVisible}
            config={modalConfig}
            onDismiss={dismissModal}
          />
        )}
      </>
    );
  }

  if (fase === "fin") {
    return (
      <>
        <LinearGradient colors={["#0C0C14", "#1a1a2e"]} style={preguntaStyles.gradient}>
          <Encabezado titulo="Resultado" />
          <View style={preguntaStyles.centrado}>
            <View style={preguntaStyles.resultadoTarjeta}>
              <Text style={preguntaStyles.resultadoTitulo}>Partida terminada</Text>
              <Text style={preguntaStyles.resultadoPuntaje}>
                {aciertos}/{rondas.length}
              </Text>
              <Text style={preguntaStyles.resultadoDetalle}>respuestas correctas</Text>
              <Boton texto="Volver al inicio" onPress={volverAlHome} />
            </View>
          </View>
        </LinearGradient>
        {modalConfig && (
          <Modal
            visible={modalVisible}
            config={modalConfig}
            onDismiss={dismissModal}
          />
        )}
      </>
    );
  }

  if (!elegida) {
    return (
      <>
        <SeleccionPregunta
          key={indice}
          opciones={rondas[indice]}
          ronda={indice + 1}
          total={rondas.length}
          aciertos={aciertos}
          onConfirmar={elegirCandidata}
        />
        {modalConfig && (
          <Modal
            visible={modalVisible}
            config={modalConfig}
            onDismiss={dismissModal}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Pregunta
        key={elegida.id}
        pregunta={elegida}
        numero={indice + 1}
        total={rondas.length}
        seleccion={seleccion}
        confirmada={confirmada}
        ocultas={ocultas}
        pistas={pistas}
        puedeUsarPista={!confirmada && pistas > 0 && elegida.respuestas.length - ocultas.length > 2}
        segundos={modo === "contrarreloj" ? segundos : undefined}
        esUltima={indice + 1 >= rondas.length}
        onSeleccionar={seleccionar}
        onPista={usarPista}
        onConfirmar={confirmar}
        onSiguiente={siguiente}
      />
      {modalConfig && (
        <Modal
          visible={modalVisible}
          config={modalConfig}
          onDismiss={dismissModal}
        />
      )}
    </>
  );
}
