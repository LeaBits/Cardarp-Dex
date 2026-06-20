import type { PokemonDetails } from "../pokeapi";
import { formGroups, type FormGroup } from "../models/forms";
import {
  getFormGroup,
  getFormName,
  isAlternativeForm
} from "../utils/pokemon";
import { renderFilterPanel } from "./FilterPanel";
import { renderPokemonCard } from "./PokemonCard";

export class DexView {
  private enabledFormGroups = new Set<FormGroup>(
    formGroups
  );

  constructor(
    private app: HTMLDivElement,
    private pokemon: PokemonDetails[]
  ) {}

  render() {
    const visiblePokemon = this.pokemon.filter(
      pokemon => {
        if (!isAlternativeForm(pokemon)) {
          return true;
        }

        const group = getFormGroup(
          getFormName(pokemon)
        );

        return (
          group !== null &&
          this.enabledFormGroups.has(group)
        );
      }
    );

    this.app.innerHTML = `
      <div class="container">

        <h1>Cardarp Dex</h1>

        ${renderFilterPanel(
          this.enabledFormGroups
        )}

        <ul
          id="dex"
          class="row list-unstyled"
        >
          ${visiblePokemon
            .map(renderPokemonCard)
            .join("")}
        </ul>

      </div>
    `;

    this.bindEvents();
  }

  private bindEvents() {
    document
      .querySelectorAll<HTMLInputElement>(
        ".form-filter"
      )
      .forEach(input => {
        input.addEventListener(
          "change",
          event => {
            const checkbox =
              event.currentTarget;

            const group =
              checkbox.value as FormGroup;

            if (checkbox.checked) {
              this.enabledFormGroups.add(
                group
              );
            } else {
              this.enabledFormGroups.delete(
                group
              );
            }

            this.render();
          }
        );
      });
  }
}