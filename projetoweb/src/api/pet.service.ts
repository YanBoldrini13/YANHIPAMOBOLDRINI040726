import api from "./axios"; // axios configurado com token

export type Pet = {
  id: string;
  name: string;
  age: number;
  species: string;
  breed: string;
};

export type PetListResponse = {
  content: Pet[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; //pag
};

export const listarPets = async (page = 0, size = 10): Promise<PetListResponse> => {
  try {
    const response = await api.get(`/v1/pets?page=${page}&size=${size}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao buscar pets:", error.message);
    } else {
      console.error("Erro desconhecido ao buscar pets:", error);
    }
    throw error;
  }
};