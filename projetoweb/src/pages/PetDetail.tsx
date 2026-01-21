import { useEffect, useState } from "react";
import { getPets, type Pet } from "../api/pet.service";

export default function Petslist() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const data = await getPets(page, size);
        setPets(data.content);
      } catch (error) {
        console.error("Erro ao carregar pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [page, size]);

  if (loading) return <p>Carregando pets...</p>;

  return (
    <div>
      <h2>Lista de Pets</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            {pet.name} - {pet.species} - {pet.age} anos
          </li>
        ))}
      </ul>

      <button onClick={() => setPage(page - 1)} disabled={page === 0}>
        Anterior
      </button>
      <button onClick={() => setPage(page + 1)}>Próxima</button>
    </div>
  );
}
