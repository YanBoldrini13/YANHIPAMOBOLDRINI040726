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
};

export type CriarPet = {
  nome: string;
  raca: string;
  idade: number;
};