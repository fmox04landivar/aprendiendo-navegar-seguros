/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Award } from "lucide-react";
import { MODULOS } from "../data/contenidos";
import { guardarResultadoNocoDB } from "../services/nocodb";

export default function EvaluacionForm() {
  const [nombre, setNombre] = useState("");
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const seleccionar = (pregunta, opcion) => {
    setRespuestas(prev => ({
      ...prev,
      [pregunta]: opcion
    }));
  };

  const finalizar = async (e) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim()) {
      setError("Escribe tu nombre antes de continuar.");
      return;
    }

    if (Object.keys(respuestas).length !== MODULOS.length) {
      setError("Responde todas las preguntas.");
      return;
    }

    const puntos = MODULOS.filter(
      modulo => respuestas[modulo.id] === modulo.correcta
    ).length;

    const porcentaje = Math.round(
      (puntos / MODULOS.length) * 100
    );

    setGuardando(true);

    try {
      await guardarResultadoNocoDB({
        nombre: nombre.trim(),
        punteo: puntos,
        total: MODULOS.length,
        porcentaje
      });

      setResultado({ puntos, porcentaje });
    } catch (err) {
      setError(
        "No se pudo guardar el resultado. " +
        "Revisa la conexión e inténtalo nuevamente."
      );
    } finally {
      setGuardando(false);
    }
  };

  if (resultado) {
    return (
      <motion.div
        className="resultado-card"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Award size={55} />
        <h2>¡Evaluación finalizada!</h2>
        <h3>{nombre}</h3>

        <div className="puntuacion">
          {resultado.porcentaje}%
        </div>

        <p>
          Obtuviste {resultado.puntos} de {MODULOS.length} respuestas correctas.
        </p>

        <button
          className="btn-primary"
          onClick={() => window.location.reload()}
        >
          Volver a realizar
        </button>
      </motion.div>
    );
  }

  return (
    <form className="evaluacion-card" onSubmit={finalizar}>
      <h2>Evaluación de aprendizaje</h2>

      <p>
        Demuestra lo que aprendiste sobre seguridad en Internet.
      </p>

      <label htmlFor="nombre">Nombre del estudiante</label>

      <input
        id="nombre"
        type="text"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder="Escribe tu nombre"
        required
      />

      {MODULOS.map((modulo, index) => (
        <div className="pregunta" key={modulo.id}>
          <h3>
            {index + 1}. {modulo.actividad}
          </h3>

          {modulo.opciones.map((opcion, i) => (
            <label className="respuesta" key={i}>
              <input
                type="radio"
                name={`pregunta-${modulo.id}`}
                checked={respuestas[modulo.id] === i}
                onChange={() => seleccionar(modulo.id, i)}
              />
              {opcion}
            </label>
          ))}
        </div>
      ))}

      {error && <p className="mensaje-error">{error}</p>}

      <button
        type="submit"
        className="btn-primary"
        disabled={guardando}
      >
        {guardando ? "Guardando..." : "Finalizar evaluación"}
      </button>
    </form>
  );
}
