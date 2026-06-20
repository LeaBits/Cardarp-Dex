import type { FormGroup } from "./forms";

export interface Dex {
  id: string;
  name: string;
  enabledFormGroups: FormGroup[];
  createdAt: number;
  updatedAt: number;
}

export interface DexPokemon {
  pokemonId: number;
  owned: boolean;
}

export interface DexCard {
  id: string;
  pokemonId: number;
  name: string;
  rarity: string;
  variant: string;
  quantity: number;
}