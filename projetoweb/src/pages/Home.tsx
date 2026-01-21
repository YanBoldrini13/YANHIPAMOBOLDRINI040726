import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <h1 className="logo">🐾 Pet Manager</h1>

        <ul className="nav-links">
          <li>
            <Link to="/pets">Buscar Pets</Link>
          </li>
          <li>
            <Link to="/pets/novo">Cadastrar Pet</Link>
          </li>
          <li>
            <Link to="/tutor/novo">Cadastrar Tutor</Link>
          </li>
        </ul>
      </nav>

      <main className="home-content">
        <h2>Bem-vindo ao Pet Manager</h2>
        <p>Escolha uma opção no menu acima.</p>
      </main>
    </div>
  );
}
