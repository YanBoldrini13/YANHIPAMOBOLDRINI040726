export type PetFoto = {
  id: number;
  nome: string;
  contentType: string;
  url: string;
};

export type Pet = {
  id: number;
  nome: string;
  raca: string;
  idade: number;
  foto?: PetFoto;
  tutor?: {
    id: number;
    nome: string;
    email: string;
  };
};

export type CriarPet = {
  nome: string;
  raca: string;
  idade: number;
};