import type { PetFoto } from "./Pet";

export type Tutor = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    cpf: number;
    foto?: PetFoto;
};

export type CriarTutor = {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    cpf: number;
};

export type AtualizarTutor = {
    nome: string;
    telefone: string;
    endereco: string;
};
