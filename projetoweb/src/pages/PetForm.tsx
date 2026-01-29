import { useState } from "react";
import { salvaPet } from "../api/pet.service";
import { useNavigate } from "react-router-dom";

export default function PetForm() {
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await salvaPet({ nome, raca, idade });
      alert("🐾 Pet cadastrado com sucesso!");
      navigate("/pets");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar pet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-white">Novo Amiguinho</h2>
        <p className="text-slate-400 mt-2">Preencha os dados abaixo para cadastrar um novo pet.</p>
      </div>

      <div className="glass rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Nome do Pet</label>
              <input
                type="text"
                placeholder="Ex: Rex, Luna..."
                className="input-field py-4"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 ml-1">Raça</label>
                <input
                  type="text"
                  placeholder="Ex: Golden, SRD..."
                  className="input-field py-4"
                  value={raca}
                  onChange={(e) => setRaca(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 ml-1">Idade (Anos)</label>
                <input
                  type="number"
                  placeholder="0"
                  className="input-field py-4"
                  value={idade}
                  onChange={(e) => setIdade(Number(e.target.value))}
                  required
                />
              </div>
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
                "Finalizar Cadastro"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/pets")}
              className="px-8 py-4 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white rounded-2xl transition-all duration-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 text-center text-slate-500 text-sm">
        <p>Você poderá adicionar uma foto do pet logo após o cadastro na página de edição. 📸</p>
      </div>
    </div>
  );
}
