import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-slate-800/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent flex items-center gap-2">
                            <span>🐾</span>
                            <span className="hidden sm:inline">Pet Manager</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="text-slate-300 hover:text-teal-400 font-medium transition-colors">Home</Link>
                        <Link to="/pets" className="text-slate-300 hover:text-teal-400 font-medium transition-colors">Pets</Link>
                        <Link to="/tutores" className="text-slate-300 hover:text-teal-400 font-medium transition-colors">Tutores</Link>
                        <Link to="/pets/novo" className="text-slate-300 hover:text-teal-400 font-medium transition-colors">Novo Pet</Link>
                        <Link to="/tutor/novo" className="text-slate-300 hover:text-teal-400 font-medium transition-colors">Novo Tutor</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors"
                        >
                            Sair
                        </button>
                    </div>
                </div>

                {/* Mobile menu (simplificado) */}
                <div className="md:hidden flex space-x-4 pb-3 overflow-x-auto no-scrollbar">
                    <Link to="/" className="text-xs text-slate-400 hover:text-teal-400 whitespace-nowrap">Home</Link>
                    <Link to="/pets" className="text-xs text-slate-400 hover:text-teal-400 whitespace-nowrap">Pets</Link>
                    <Link to="/tutores" className="text-xs text-slate-400 hover:text-teal-400 whitespace-nowrap">Tutores</Link>
                    <Link to="/pets/novo" className="text-xs text-slate-400 hover:text-teal-400 whitespace-nowrap">Novo Pet</Link>
                    <Link to="/tutor/novo" className="text-xs text-slate-400 hover:text-teal-400 whitespace-nowrap">Novo Tutor</Link>
                </div>
            </div>
        </header>
    );
}
