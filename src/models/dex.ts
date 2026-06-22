import type { FormGroup } from "./forms";

export interface Dex {
  id: string;
  name: string;
  enabledFormGroups: FormGroup[];
  createdAt: number;
  updatedAt: number;
}

export type TcgCardType =
  | "normal"
  | "holo"
  | "reverse-holo"
  | "illustration-rare"
  | "special-illustration-rare"
  | "promo";

export interface DexPokemon {
  pokemonId: number;
  pokemonName: string;
  owned: boolean;
  cardType: TcgCardType | null;
  notes: string;
  updatedAt: number;
}

export const tcgCardTypes: TcgCardType[] = [
  "normal",
  "holo",
  "reverse-holo",
  "illustration-rare",
  "special-illustration-rare",
  "promo"
];

export function formatTcgCardType(type: TcgCardType): string {
  return type
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}