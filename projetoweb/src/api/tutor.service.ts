import api from "./axios";

export const listarTutores = () => api.get("/tutores");
export const buscarTutor = (id: any) => api.get(`/tutores/${id}`);
export const salvarTutor = (data: any) => api.post("/tutores", data);
export const atualizarTutor = (id: any, data: any) => api.put(`/tutores/${id}`, data);
