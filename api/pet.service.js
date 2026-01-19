import api from "./axios";

export const listarPets = () => api.get("/pets");
export const buscarPet = (id) => api.get(`/pets/${id}`);
export const salvarPet = (data) => api.post("/pets", data);
export const atualizarPet = (id, data) => api.put(`/pets/${id}`, data);
