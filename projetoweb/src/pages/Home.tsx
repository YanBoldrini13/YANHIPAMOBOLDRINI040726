import { Link } from "react-router-dom";
import "../Main.css";
import bgPets from "../img/backgroud-home.jpg";

export default function Home() {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${bgPets})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* Cabeçalho */}
      <header className="home-header" style={{ flexDirection: "column", alignItems: "center" }}>
        <h1 className="logo">🐾 Pet Manager</h1>
        <nav>
          <ul className="menu flex flex-wrap gap-4">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/pets">Buscar Pets</Link></li>
            <li><Link to="/pets/novo">Cadastrar Pet</Link></li>
            <li><Link to="/tutor/novo">Cadastrar Tutor</Link></li>
          </ul>
        </nav>
      </header>

      {/* Conteúdo principal */}
      <main className="home-main">
        <div id="slogan">Pets</div>
        <div id="slogan2">
          Gerencie pets e tutores de forma simples, rápida e profissional.
          Centralize cadastros, buscas e informações em um só lugar.
        </div>
      </main>
    </div>
  );
}
