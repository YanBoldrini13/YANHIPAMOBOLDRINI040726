import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listarPets } from "../api/pet.service";

type Pet = {
  id: number;
  name: string;
  breed: string;
};

export default function PetsList() {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    async function fetchPets() {
      try {
        const data = await listarPets(); // já é Pet[]
        setPets(data);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    }

    fetchPets();
  }, []);

  return (
    <div>
      <h1>Lista de Pets</h1>
      <Link to="/pets/novo">Adicionar Novo Pet</Link>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <Link to={`/pets/${pet.id}`}>{pet.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
