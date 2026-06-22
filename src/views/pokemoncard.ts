import type { PokemonDetails } from "../pokeapi";
import type { DexPokemon } from "../models/Dex";
import { formatTcgCardType } from "../models/Dex";
import {
  getArtworkUrl,
  getFormClass,
  getFormGroup,
  getFormName,
  isAlternativeForm
} from "../utils/pokemon";

export function renderPokemonCard(
  pokemon: PokemonDetails,
  ownedPokemon: Map<number, DexPokemon>
): string {
  const artworkUrl = getArtworkUrl(pokemon);

  if (!artworkUrl) {
    return "";
  }

  const savedPokemon = ownedPokemon.get(pokemon.id);
  const cardType = savedPokemon?.cardType ?? null;

  const classes: string[] = ["pokemon-card"];

  if (cardType) {
    classes.push("owned");
    classes.push(`card-type-${cardType}`);
  }

  if (isAlternativeForm(pokemon)) {
    classes.push("alternative-form");

    const formClass = getFormClass(pokemon);
    const formGroup = getFormGroup(getFormName(pokemon));

    if (formClass) {
      classes.push(formClass);
    }

    if (formGroup) {
      classes.push(`form-group-${formGroup}`);
    }
  }

  return `
    <li class="col-xs-6 col-sm-4 col-md-3">
      <button
        type="button"
        class="${classes.join(" ")}"
        data-pokemon-id="${pokemon.id}"
        data-pokemon-name="${pokemon.name}"
      >
        <span class="number">#${pokemon.id}</span>

        <img src="${artworkUrl}" alt="${pokemon.name}" />

        <span class="name">${pokemon.name}</span>

        <span class="card-type">
          ${cardType ? formatTcgCardType(cardType) : "Not owned"}
        </span>
      </button>
    </li>
  `;
}