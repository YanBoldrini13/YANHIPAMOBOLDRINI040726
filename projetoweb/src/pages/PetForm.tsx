import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { salvaPet } from "../api/pet.service";

export default function PetForm() {
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await salvaPet({ nome, raca, idade });
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar pet:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Novo Pet</h1>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <input
        placeholder="Raça"
        value={raca}
        onChange={(e) => setRaca(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(Number(e.target.value))}
        required
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
