import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { salvaPet } from "../api/pet.service";

export default function PetForm() {
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await salvaPet({ nome, raca, idade: Number(idade) });
      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Erro ao criar pet:", error);
      alert("Erro ao salvar o pet ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🐾 Novo Pet
        </h1>

        {success && (
          <div className="mb-4 rounded-lg bg-green-100 text-green-700 px-4 py-3 text-sm text-center">
            Pet cadastrado com sucesso! Redirecionando...
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Raça
          </label>
          <input
            type="text"
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Idade
          </label>
          <input
            type="number"
            min={0}
            value={idade}
            onChange={(e) =>
              setIdade(e.target.value ? Number(e.target.value) : "")
            }
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
