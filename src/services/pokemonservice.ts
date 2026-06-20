import { getPokemonDetails, getPokemonList } from "../pokeapi";
import { getArtworkUrl, sortPokemonBySpecies } from "../utils/pokemon";

export async function loadPokemon() {
  const list = await getPokemonList();

  const pokemon = await Promise.all(
    list.results.map(item => getPokemonDetails(item.name))
  );

  return pokemon
    .filter(p => getArtworkUrl(p))
    .sort(sortPokemonBySpecies);
}