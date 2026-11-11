import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  LockKeyhole,
  AlertTriangle,
  HeartHandshake,
  Globe,
  CheckCircle,
  XCircle
} from "lucide-react";

const ICONOS = {
  ShieldCheck,
  LockKeyhole,
  AlertTriangle,
  HeartHandshake,
  Globe
};

export default function ActividadItem({ modulo, numero }) {
  const [respuesta, setRespuesta] = useState(null);
  const [mostrarContenido, setMostrarContenido] = useState(false);

  const Icono = ICONOS[modulo.icono];

  const esCorrecta = respuesta === modulo.correcta;

  return (
    <motion.article
      className="modulo-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="modulo-icon"
        style={{ backgroundColor: modulo.color }}
      >
        {Icono && <Icono color="white" size={28} />}
      </div>

      <span className="modulo-numero">
        MÓDULO {numero}
      </span>

      <h3>{modulo.titulo}</h3>
      <p>{modulo.descripcion}</p>

      <button
        className="btn-secondary"
        onClick={() => setMostrarContenido(!mostrarContenido)}
      >
        {mostrarContenido ? "Ocultar contenido" : "Aprender tema"}
      </button>

      {mostrarContenido && (
        <div className="contenido-modulo">
          <p>{modulo.contenido}</p>

          <h4>{modulo.actividad}</h4>

          {modulo.opciones.map((opcion, index) => (
            <button
              key={index}
              className={`opcion ${
                respuesta === index ? "seleccionada" : ""
              }`}
              onClick={() => setRespuesta(index)}
            >
              {opcion}
            </button>
          ))}

          {respuesta !== null && (
            <div className={esCorrecta ? "correcto" : "incorrecto"}>
              {esCorrecta ? (
                <CheckCircle size={20} />
              ) : (
                <XCircle size={20} />
              )}
              <p>
                {esCorrecta
                  ? modulo.explicacion
                  : "Inténtalo nuevamente. Lee las opciones y piensa cuál es la más segura."}
              </p>
            </div>
          )}
        </div>
      )}
    </motion.article>
  );
}
