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
  | "reverse-holo"
  | "holo"
  | "ex"
  | "v"
  | "vmax"
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
  "reverse-holo",
  "holo",
  "ex",
  "v",
  "vmax",
  "illustration-rare",
  "special-illustration-rare",
  "promo"
];

export function formatTcgCardType(
  type: TcgCardType
): string {
  switch (type) {
    case "ex":
      return "EX";

    case "v":
      return "V";

    case "vmax":
      return "VMAX";

    case "reverse-holo":
      return "Reverse Holo";

    case "illustration-rare":
      return "Illustration Rare";

    case "special-illustration-rare":
      return "Special Illustration Rare";

    default:
      return type
        .split("-")
        .map(
          word =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ");
  }
}