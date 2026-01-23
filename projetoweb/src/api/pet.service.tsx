import api from "./axios";
import type { Pet, CriarPet  } from "../tipos/Pet";

export type PetListResponse = {
  page: number;
  size: number;
  total: number;
  pageCount: number;
  content: Pet[];
};

export const listarPets = async (
  page = 0,
  size = 10
): Promise<PetListResponse> => {
  const response = await api.get(
    `/v1/pets?page=${page}&size=${size}`
  );
  return response.data;
};

export const salvaPet = async (
  pet: CriarPet
): Promise<Pet> => {
  const response = await api.post("/v1/pets", pet);
  return response.data;
};