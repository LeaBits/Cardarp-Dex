import type { PokemonDetails } from "../pokeapi";
import type { Dex } from "../models/Dex";
import { formGroups, type FormGroup } from "../models/forms";
import { saveDexFilters } from "../services/dexService";
import {
  getFormGroup,
  getFormName,
  isAlternativeForm
} from "../utils/pokemon";
import { renderFilterPanel } from "./FilterPanel";
import { renderPokemonCard } from "./PokemonCard";

export class DexView {
  private enabledFormGroups: Set<FormGroup>;

  constructor(
    private app: HTMLDivElement,
    private pokemon: PokemonDetails[],
    private uid: string,
    private dex: Dex,
    private onDexUpdated: () => Promise<void>
  ) {
    this.enabledFormGroups = new Set<FormGroup>(
      dex.enabledFormGroups.length > 0 ? dex.enabledFormGroups : formGroups
    );
  }

  render() {
    const visiblePokemon = this.pokemon.filter(pokemon => {
      if (!isAlternativeForm(pokemon)) {
        return true;
      }

      const group = getFormGroup(getFormName(pokemon));

      return group !== null && this.enabledFormGroups.has(group);
    });

    this.app.innerHTML = `
      <h2>${this.dex.name}</h2>

      ${renderFilterPanel(this.enabledFormGroups)}

      <ul id="dex" class="row list-unstyled">
        ${visiblePokemon.map(renderPokemonCard).join("")}
      </ul>
    `;

    this.bindEvents();
  }

  private bindEvents() {
    document.querySelectorAll<HTMLInputElement>(".form-filter").forEach(input => {
      input.addEventListener("change", async event => {
        const checkbox = event.currentTarget;
        const group = checkbox.value as FormGroup;

        if (checkbox.checked) {
          this.enabledFormGroups.add(group);
        } else {
          this.enabledFormGroups.delete(group);
        }

        await saveDexFilters(
          this.uid,
          this.dex.id,
          Array.from(this.enabledFormGroups)
        );

        await this.onDexUpdated();
      });
    });
  }
}