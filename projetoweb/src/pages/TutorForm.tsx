import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { salvarTutor } from "../api/tutor.service";

export default function TutorForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await salvarTutor({ name, email });
      alert("✅ Tutor cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar tutor:", error);
      alert("Erro ao cadastrar tutor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-white">Novo Tutor</h2>
        <p className="text-slate-400 mt-2">Cadastre os dados do responsável pelos pets.</p>
      </div>

      <div className="glass rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Nome Completo</label>
              <input
                type="text"
                placeholder="Ex: João Silva"
                className="input-field py-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">E-mail de Contato</label>
              <input
                type="email"
                placeholder="exemplo@email.com"
                className="input-field py-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-grow py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Cadastrar Tutor"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-8 py-4 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white rounded-2xl transition-all duration-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
