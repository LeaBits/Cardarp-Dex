import type { PokemonDetails } from "../pokeapi";
import {
  getArtworkUrl,
  getFormClass,
  getFormGroup,
  getFormName,
  isAlternativeForm
} from "../utils/pokemon";

export function renderPokemonCard(
  pokemon: PokemonDetails
): string {
  const artworkUrl = getArtworkUrl(pokemon);

  if (!artworkUrl) {
    return "";
  }

  const classes: string[] = ["pokemon-card"];

  if (isAlternativeForm(pokemon)) {
    classes.push("alternative-form");

    const formClass = getFormClass(pokemon);

    if (formClass) {
      classes.push(formClass);
    }

    const formGroup = getFormGroup(getFormName(pokemon));

    if (formGroup) {
      classes.push(`form-group-${formGroup}`);
    }
  }

  return `
    <li class="col-xs-6 col-sm-4 col-md-3">
      <div class="${classes.join(" ")}">

        <span class="number">
          #${pokemon.id}
        </span>

        <img
          src="${artworkUrl}"
          alt="${pokemon.name}"
        />

        <span class="name">
          ${pokemon.name}
        </span>

      </div>
    </li>
  `;
}