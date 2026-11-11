/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { History, RefreshCw, AlertTriangle } from "lucide-react";
import { obtenerResultadosNocoDB } from "../services/nocodb";

export default function HistorialResultados() {
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarResultados = async () => {
    setCargando(true);
    setError("");

    try {
      const datos = await obtenerResultadosNocoDB();

      const lista = Array.isArray(datos)
        ? datos
        : datos.list || datos.records || [];

      setResultados(lista);
    } catch (err) {
      console.error("Error al cargar el historial:", err);
      setError("No se pudieron cargar los resultados. Inténtalo nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarResultados();
  }, []);

  return (
    <section className="historial-card" aria-labelledby="titulo-historial">
      <div className="historial-encabezado">
        <div className="section-heading">
          <History size={25} />
          <div>
            <h2 id="titulo-historial">Historial de evaluaciones</h2>
            <p>Consulta los resultados registrados de los estudiantes.</p>
          </div>
        </div>

        <button
          type="button"
          className="btn-secondary"
          onClick={cargarResultados}
          disabled={cargando}
        >
          <RefreshCw size={17} />
          {cargando ? "Actualizando..." : "Actualizar"}
        </button>
      </div>

      {cargando ? (
        <p role="status">Cargando resultados...</p>
      ) : error ? (
        <div className="historial-error" role="alert">
          <AlertTriangle size={20} />
          <p>{error}</p>
        </div>
      ) : resultados.length === 0 ? (
        <p className="historial-vacio">
          Todavía no hay evaluaciones registradas.
        </p>
      ) : (
        <div className="historial-tabla-contenedor">
          <table className="historial-tabla">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Punteo</th>
                <th>Porcentaje</th>
              </tr>
            </thead>

            <tbody>
              {resultados.map((registro, index) => {
                const nombre =
                  registro.nombre ?? registro.fields?.nombre ?? "Sin nombre";

                const punteo =
                  registro.punteo ?? registro.fields?.punteo ?? 0;

                const total =
                  registro.total ?? registro.fields?.total ?? 0;

                const porcentaje =
                  registro.porcentaje ??
                  registro.fields?.porcentaje ??
                  0;

                return (
                  <motion.tr
                    key={registro.Id ?? registro.id ?? index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td>{nombre}</td>
                    <td>{punteo} de {total}</td>
                    <td>{porcentaje}%</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
