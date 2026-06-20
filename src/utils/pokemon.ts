import type { PokemonDetails } from "../pokeapi";
import type { FormGroup } from "../models/forms";

export function getIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return Number(parts.at(-1));
}

export function getSpeciesId(pokemon: PokemonDetails): number {
  return getIdFromUrl(pokemon.species.url);
}

export function isAlternativeForm(pokemon: PokemonDetails): boolean {
  return pokemon.id !== getSpeciesId(pokemon);
}

export function getFormClass(pokemon: PokemonDetails): string | null {
  if (!isAlternativeForm(pokemon)) return null;

  const speciesName = pokemon.species.name;

  if (!pokemon.name.startsWith(`${speciesName}-`)) return null;

  const formName = pokemon.name.slice(speciesName.length + 1);

  return `form-${formName}`;
}

export function getFormName(pokemon: PokemonDetails): string | null {
  return getFormClass(pokemon)?.replace("form-", "") ?? null;
}

export function getFormGroup(formName: string | null): FormGroup | null {
  if (!formName) return null;

  if (formName.startsWith("mega")) return "mega";
  if (formName === "gmax") return "gigantamax";

  if (["alola", "galar", "hisui", "paldea"].some(region => formName.includes(region))) {
    return "regional";
  }

  if (["attack", "defense", "speed", "origin", "altered", "sky", "therian"].some(form =>
    formName.includes(form)
  )) {
    return "battle";
  }

  return "other";
}

export function getArtworkUrl(pokemon: PokemonDetails): string | null {
  return pokemon.sprites.other["official-artwork"].front_default;
}

export function sortPokemonBySpecies(a: PokemonDetails, b: PokemonDetails): number {
  const speciesDiff = getSpeciesId(a) - getSpeciesId(b);

  if (speciesDiff !== 0) return speciesDiff;

  return Number(isAlternativeForm(a)) - Number(isAlternativeForm(b));
}