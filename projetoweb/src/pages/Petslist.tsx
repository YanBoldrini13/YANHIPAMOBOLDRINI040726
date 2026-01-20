import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listarPets } from "../api/pet.service";

export default function Petslist() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await listarPets();
        setPets(data);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    };
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
