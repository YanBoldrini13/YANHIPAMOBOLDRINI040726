import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { salvarTutor } from "../api/tutor.service";

export default function TutorForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await salvarTutor({ name, email });
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar tutor:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Novo Tutor</h1>

      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
