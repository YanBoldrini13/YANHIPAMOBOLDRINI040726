import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      alert("Erro ao logar: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* decorativos */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-500/10 rounded-3xl border border-teal-500/20 mb-6 group hover:scale-110 transition-transform duration-500">
            <span className="text-4xl group-hover:rotate-12 transition-transform">🐾</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Pet Gerenciador</h1>
          <p className="text-slate-400 mt-2">Bem-vindo de volta! Entre na sua conta.</p>
        </div>

        <div className="glass rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
          {/* cor azul decorativa */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-2xl rounded-full translate-x-12 -translate-y-12"></div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Usuário</label>
              <input
                type="text"
                placeholder="Seu usuário"
                className="input-field py-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                className="input-field py-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-teal-500/30 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Entrar no Sistema"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Esqueceu sua senha? <span className="text-teal-400 hover:underline cursor-pointer font-medium">Contate o administrador</span>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-600 text-xs uppercase tracking-widest font-bold">
          &copy; 2026 Pet gerenciador. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
