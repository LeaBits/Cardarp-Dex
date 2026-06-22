import type { PokemonDetails } from "../pokeapi";
import type { Dex, DexPokemon, TcgCardType } from "../models/dex";
import { formGroups, type FormGroup } from "../models/forms";
import { tcgCardTypes } from "../models/dex";
import {
  loadDexPokemon,
  saveDexFilters,
  saveDexPokemon
} from "../services/dexservice";
import {
  getFormGroup,
  getFormName,
  isAlternativeForm
} from "../utils/pokemon";
import { renderFilterPanel } from "./filterpanel";
import { renderPokemonCard } from "./pokemoncard";

export class DexView {
  private enabledFormGroups: Set<FormGroup>;
  private ownedPokemon = new Map<number, DexPokemon>();

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

  async render() {
    await this.loadOwnedPokemon();

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
        ${visiblePokemon
          .map(pokemon => renderPokemonCard(pokemon, this.ownedPokemon))
          .join("")}
      </ul>
    `;

    this.bindEvents();
  }

  private async loadOwnedPokemon() {
    const ownedPokemon = await loadDexPokemon(this.uid, this.dex.id);

    this.ownedPokemon = new Map(
      ownedPokemon
        .filter(pokemon => pokemon.owned && pokemon.cardType)
        .map(pokemon => [pokemon.pokemonId, pokemon])
    );
  }

  private getNextCardType(
    currentType: TcgCardType | null
  ): TcgCardType | null {
    if (!currentType) {
      return tcgCardTypes[0];
    }

    const currentIndex = tcgCardTypes.indexOf(currentType);
    const nextType = tcgCardTypes[currentIndex + 1];

    return nextType ?? null;
  }

  private bindEvents() {
    document.querySelectorAll<HTMLInputElement>(".form-filter").forEach(input => {
      input.addEventListener("change", async event => {
        const checkbox = event.currentTarget as HTMLInputElement;
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

    document.querySelectorAll<HTMLButtonElement>(".pokemon-card").forEach(card => {
      card.addEventListener("click", async event => {
        const button = event.currentTarget as HTMLButtonElement;

        const pokemonId = Number(button.dataset.pokemonId);
        const pokemonName = button.dataset.pokemonName ?? "";

        const currentPokemon = this.ownedPokemon.get(pokemonId);
        const currentType = currentPokemon?.cardType ?? null;
        const nextType = this.getNextCardType(currentType);
        const owned = nextType !== null;

        const updatedPokemon: DexPokemon = {
          pokemonId,
          pokemonName,
          owned,
          cardType: nextType,
          notes: currentPokemon?.notes ?? "",
          updatedAt: Date.now()
        };

        await saveDexPokemon(this.uid, this.dex.id, updatedPokemon);

        if (owned) {
          this.ownedPokemon.set(pokemonId, updatedPokemon);
        } else {
          this.ownedPokemon.delete(pokemonId);
        }

        await this.render();
      });
    });
  }
}