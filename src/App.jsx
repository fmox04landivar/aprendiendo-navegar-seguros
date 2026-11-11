import HeaderClase from "./components/HeaderClase";
import ObjetivoCard from "./components/ObjetivoCard";
import ActividadItem from "./components/ActividadItem";
import EvaluacionForm from "./components/EvaluacionForm";
import { MODULOS } from "./data/contenidos";
import { motion } from "framer-motion";
import { ShieldCheck, BookOpen } from "lucide-react";
import "./App.css";
import "./index.css";
 import HistorialResultados from "./components/HistorialResultados";

export default function App() {
  return (
    <>
      <HeaderClase />

      <main>
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="etiqueta">APRENDE • PROTEGE • NAVEGA</span>

            <h1>
              Tu seguridad en Internet
              <span> comienza contigo.</span>
            </h1>

            <p>
              Descubre cómo proteger tu información,
              reconocer riesgos y utilizar Internet
              de manera responsable.
            </p>

            <a href="#modulos" className="btn-primary">
              Comenzar a aprender
            </a>
          </motion.div>

          <div className="hero-icon">
            <ShieldCheck size={130} />
          </div>
        </section>

        <div className="contenedor">
          <ObjetivoCard />

          <section id="modulos">
            <div className="titulo-seccion">
              <BookOpen size={27} />
              <div>
                <h2>Módulos de aprendizaje</h2>
                <p>Explora cada tema y realiza sus actividades.</p>
              </div>
            </div>

            <div className="modulos-grid">
              {MODULOS.map((modulo, index) => (
                <ActividadItem
                  key={modulo.id}
                  modulo={modulo}
                  numero={index + 1}
                />
              ))}
            </div>
          </section>

          <section id="evaluacion">
            <EvaluacionForm />
          </section>
        </div>
      </main>
      <HistorialResultados />
      <footer className="footer">
        <ShieldCheck size={22} />
        <p>
          Aprendiendo a Navegar Seguros © 2026
        </p>
        <span>Segundo Básico | Área de TIC</span>
      </footer>
    </>
  );
}
