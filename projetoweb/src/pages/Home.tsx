import { Link } from "react-router-dom";
import bgPets from "../img/backgroud-home.jpg";

export default function Home() {
  return (
    <div className="relative overflow-hidden -mt-8 -mx-4 h-[80vh] flex items-center justify-center rounded-b-[3rem] shadow-2xl">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 scale-105"
        style={{
          backgroundImage: `url(${bgPets})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3) blur(2px)",
        }}
      />

      {/* Dynamic Shapes for Aesthetics */}
      <div className="absolute top-1/4 -right-10 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-1000">
        <div className="inline-block px-4 py-1 bg-teal-500/20 border border-teal-500/30 rounded-full text-teal-400 text-sm font-medium mb-4">
          Sistema de Gestão Profissional
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
          Cuidar de quem <br />
          <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent italic">
            você ama.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Gerencie pets e tutores de forma simples, rápida e profissional.
          Centralize cadastros, buscas e informações em um só lugar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            to="/pets"
            className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Começar Agora
          </Link>
          <Link
            to="/pets/novo"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold backdrop-blur-md border border-white/20 transition-all duration-300"
          >
            Cadastrar Pet
          </Link>
        </div>
      </div>
    </div>
  );
}
