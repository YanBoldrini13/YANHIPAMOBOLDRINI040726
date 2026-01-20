import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { salvarPet } from "../api/pet.service.tsx";

export default function PetForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await salvarPet({ name, breed });
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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Raça"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
