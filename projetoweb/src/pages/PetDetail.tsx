import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { buscarPet } from "../api/pet.service";

export default function PetDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await buscarPet(id);
        setPet(data);
      } catch (error) {
        console.error("Erro ao buscar pet:", error);
      }
    };
    fetchPet();
  }, [id]);

  if (!pet) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Detalhes do Pet</h1>
      <p>Nome: {pet.name}</p>
      <p>Raça: {pet.breed}</p>
      <Link to="/">Voltar</Link>
    </div>
  );
}
