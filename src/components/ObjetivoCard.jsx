import { Target, CheckCircle } from "lucide-react";
import { OBJETIVOS } from "../data/contenidos";

export default function ObjetivoCard() {
  return (
    <section className="objetivos-card">
      <div className="section-heading">
        <Target size={25} />
        <h2>¿Qué aprenderás?</h2>
      </div>

      <p>
        Al finalizar esta clase podrás navegar por Internet
        de forma segura y responsable.
      </p>

      <ul>
        {OBJETIVOS.map((objetivo, index) => (
          <li key={index}>
            <CheckCircle size={19} />
            {objetivo}
          </li>
        ))}
      </ul>
    </section>
  );
}
