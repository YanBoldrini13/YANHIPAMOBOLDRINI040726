import api from "./axios";

export const listarTutores = () => api.get("/tutores");
export const buscarTutor = (id) => api.get(`/tutores/${id}`);
export const salvarTutor = (data) => api.post("/tutores", data);
export const atualizarTutor = (id, data) => api.put(`/tutores/${id}`, data);
