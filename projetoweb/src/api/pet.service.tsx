import axios from "axios";

/* 🔹 Tipagem do Pet */
export type Pet = {
  id: number;
  name: string;
  breed: string;
};

/* 🔹 Listar todos os pets */
export async function listarPets(): Promise<Pet[]> {
  const response = await axios.get<Pet[]>("/pets");
  return response.data;
}

/* 🔹 Buscar um pet por ID */
export async function buscarPet(id: number): Promise<Pet> {
  const response = await axios.get<Pet>(`/pets/${id}`);
  return response.data;
}

/* 🔹 Criar um novo pet */
export async function criarPet(pet: Omit<Pet, "id">): Promise<Pet> {
  const response = await axios.post<Pet>("/pets", pet);
  return response.data;
}

/* 🔹 Atualizar um pet */
export async function atualizarPet(
  id: number,
  pet: Omit<Pet, "id">
): Promise<Pet> {
  const response = await axios.put<Pet>(`/pets/${id}`, pet);
  return response.data;
}

/* 🔹 Remover um pet */
export async function deletarPet(id: number): Promise<void> {
  await axios.delete(`/pets/${id}`);
}
/* 🔹 Alias (opcional) */
export const salvarPet = criarPet;