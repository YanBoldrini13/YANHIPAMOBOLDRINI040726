import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { buscarPet } from "../api/pet.service";

/* 🔹 Tipagem do Pet */
type Pet = {
  id: number;
  name: string;
  breed: string;
};

/* 🔹 Tipagem para os parâmetros da rota */
interface RouteParams {
  id: string;
}

export default function PetDetail() {
  const params = useParams() as unknown as RouteParams; // safe para erasableSyntaxOnly
  const id = params.id;

  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      const petId = Number(id);
      if (isNaN(petId)) {
        console.error("ID inválido:", id);
        setLoading(false);
        return;
      }

      try {
        const response = await buscarPet(petId);
        setPet(response);
      } catch (error) {
        console.error("Erro ao buscar pet:", error);
        setPet(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (!pet) return <div>Pet não encontrado</div>;

  return (
    <div>
      <h1>Detalhes do Pet</h1>
      <p>Nome: {pet.name}</p>
      <p>Raça: {pet.breed}</p>
      <Link to="/pets">Voltar</Link>
    </div>
  );
}
