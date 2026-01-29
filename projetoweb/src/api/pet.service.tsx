import api from "./axios";
import type { Pet, CriarPet } from "../tipos/Pet";

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

export const buscarPetPorId = async (id: string): Promise<Pet> => {
  const response = await api.get(`/v1/pets/${id}`);
  return response.data;
};

export const atualizarPet = async (
  id: string,
  pet: CriarPet
): Promise<Pet> => {
  const response = await api.put(`/v1/pets/${id}`, pet);
  return response.data;
};

export const uploadFotoPet = async (
  id: string,
  foto: File
): Promise<void> => {
  const formData = new FormData();
  formData.append("foto", foto);
  await api.post(`/v1/pets/${id}/fotos`, formData, {

    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
