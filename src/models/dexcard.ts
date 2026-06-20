export type TcgCardType =
  | "normal"
  | "holo"
  | "reverse-holo"
  | "full-art"
  | "illustration-rare"
  | "special-illustration-rare"
  | "ex"
  | "v"
  | "vmax"
  | "promo"
  | "other";

export interface DexPokemon {
  pokemonId: number;
  pokemonName: string;
  owned: boolean;
  cardTypes: TcgCardType[];
  notes: string;
  updatedAt: number;
}