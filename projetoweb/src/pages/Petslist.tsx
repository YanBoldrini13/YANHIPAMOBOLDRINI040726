import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarPets } from "../api/pet.service";
import type { Pet } from "../tipos/Pet";

export default function Petslist() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 6;

  useEffect(() => {
    async function fetchPets() {
      setLoading(true);
      try {
        const data = await listarPets(page, size);
        setPets(data.content);
        setTotalPages(data.pageCount);
      } catch (error) {
        console.error("Erro ao carregar pets", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, [page]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">🐾 Nossos Amiguinhos</h2>
          <p className="text-slate-400 mt-2">Gerencie todos os pets cadastrados no sistema.</p>
        </div>
        <Link to="/pets/novo" className="btn-primary flex items-center gap-2">
          <span>+</span> Novo Pet
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-slate-800/50 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div key={pet.id} className="group glass rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all duration-500">
                <div className="h-48 overflow-hidden bg-slate-800 relative">
                  {pet.foto?.url ? (
                    <img
                      src={pet.foto.url}
                      alt={pet.nome}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 text-5xl">
                      🐾
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                </div>

                <div className="p-6 relative">
                  <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">{pet.nome}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full">{pet.raca}</span>
                    <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full">{pet.idade} anos</span>
                  </div>

                  <div className="mt-6">
                    <Link
                      to={`/pets/editar/${pet.id}`}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-teal-500/30 text-teal-400 hover:bg-teal-500 hover:text-white rounded-xl transition-all duration-300 font-medium"
                    >
                      Editar Perfil
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12 pb-8">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 disabled:opacity-30 hover:bg-slate-700 transition-colors"
              >
                ← Anterior
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${page === i
                        ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 disabled:opacity-30 hover:bg-slate-700 transition-colors"
              >
                Próximo →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
