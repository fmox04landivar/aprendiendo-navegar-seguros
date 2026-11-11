import { ShieldCheck, GraduationCap } from "lucide-react";

export default function HeaderClase() {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="logo-icon">
          <ShieldCheck size={30} />
        </div>

        <div>
          <h1>Aprendiendo a Navegar Seguros</h1>
          <p>Educación digital para un futuro seguro</p>
        </div>
      </div>

      <div className="header-info">
        <span>
          <GraduationCap size={18} />
          Segundo Básico
        </span>
        <span>Área de TIC</span>
      </div>
    </header>
  );
}
