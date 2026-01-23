import { useEffect, useState } from "react";
import { listarPets } from "../api/pet.service";
import type { Pet } from "../tipos/Pet";

export default function Petslist() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPets() {
      try {
        const data = await listarPets();
        setPets(data.content);
      } catch (error) {
        console.error("Erro ao carregar pets", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>🐾 Lista de Pets</h2>

      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <strong>{pet.nome}</strong> — {pet.raca} — {pet.idade} anos
            {pet.foto?.url && (
              <div>
                <img
                  src={pet.foto.url}
                  alt={pet.nome}
                  style={{ width: 120, marginTop: 8 }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
