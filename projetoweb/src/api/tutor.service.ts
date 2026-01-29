import api from "./axios";
import type { Tutor, CriarTutor, AtualizarTutor } from "../tipos/Tutor";

export type TutorListResponse = {
    page: number;
    size: number;
    total: number;
    pageCount: number;
    content: Tutor[];
};

export const listarTutores = async (
    page = 0,
    size = 10
): Promise<TutorListResponse> => {
    const response = await api.get(`/v1/tutores?page=${page}&size=${size}`);
    return response.data;
};

export const buscarTutorPorId = async (id: string | number): Promise<Tutor> => {
    const response = await api.get(`/v1/tutores/${id}`);
    return response.data;
};

export const salvarTutor = async (tutor: CriarTutor): Promise<Tutor> => {
    const response = await api.post("/v1/tutores", tutor);
    return response.data;
};

export const atualizarTutor = async (
    id: string | number,
    tutor: AtualizarTutor
): Promise<Tutor> => {
    const response = await api.put(`/v1/tutores/${id}`, tutor);
    return response.data;
};

export const uploadFotoTutor = async (
    id: string | number,
    foto: File
): Promise<void> => {
    const formData = new FormData();
    formData.append("foto", foto);
    await api.post(`/v1/tutores/${id}/fotos`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const vincularPet = async (
    tutorId: string | number,
    petId: string | number
): Promise<void> => {
    await api.post(`/v1/tutores/${tutorId}/pets/${petId}`);
};

export const desvincularPet = async (
    tutorId: string | number,
    petId: string | number
): Promise<void> => {
    await api.delete(`/v1/tutores/${tutorId}/pets/${petId}`);
};
