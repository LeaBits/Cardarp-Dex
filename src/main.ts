import { getPokemonDetails, getPokemonList, type PokemonDetails } from "./pokeapi";
import "./style/style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App element not found");
}

function getIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return Number(parts.at(-1));
}

function getSpeciesId(pokemon: PokemonDetails): number {
  return getIdFromUrl(pokemon.species.url);
}

function isAlternativeForm(pokemon: PokemonDetails): boolean {
  return pokemon.id !== getSpeciesId(pokemon);
}

function getFormClass(pokemon: PokemonDetails): string | null {
  if (!isAlternativeForm(pokemon)) {
    return null;
  }

  const speciesName = pokemon.species.name;

  if (!pokemon.name.startsWith(`${speciesName}-`)) {
    return null;
  }

  const formName = pokemon.name.slice(speciesName.length + 1);

  return `form-${formName}`;
}

function getPokemonClasses(pokemon: PokemonDetails): string {
  const classes: string[] = [];

  if (isAlternativeForm(pokemon)) {
    classes.push("alternative-form");

    const formClass = getFormClass(pokemon);

    if (formClass) {
      classes.push(formClass);
    }
  }

  return classes.join(" ");
}

function sortPokemonBySpecies(a: PokemonDetails, b: PokemonDetails): number {
  const speciesDiff = getSpeciesId(a) - getSpeciesId(b);

  if (speciesDiff !== 0) {
    return speciesDiff;
  }

  return Number(isAlternativeForm(a)) - Number(isAlternativeForm(b));
}

function renderPokemonItem(pokemon: PokemonDetails): string {
  return `
    <li class="${getPokemonClasses(pokemon)}">
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      #${pokemon.id}
      <h3>${pokemon.name}</h3>
    </li>
  `;
}

async function render() {
  app.innerHTML = "<h1>Cardarp Dex</h1><p>Loading Pokémon...</p>";

  const list = await getPokemonList();

  const pokemon = await Promise.all(
    list.results.map(item => getPokemonDetails(item.name))
  );

  const sortedPokemon = pokemon
    .filter(p => p.sprites.front_default)
    .sort(sortPokemonBySpecies);

  app.innerHTML = `
    <h1>Cardarp Dex</h1>

    <ul id="dex">
      ${sortedPokemon.map(renderPokemonItem).join("")}
    </ul>
  `;
}

render();