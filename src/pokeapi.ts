export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

export type PokemonDetails = {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
  species: {
    name: string;
    url: string;
  };
};

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit = 1350, offset = 0) {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  return response.json() as Promise<PokemonListResponse>;
}

export async function getPokemonDetails(nameOrId: string | number) {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon: ${nameOrId}`);
  }

  return response.json() as Promise<PokemonDetails>;
}