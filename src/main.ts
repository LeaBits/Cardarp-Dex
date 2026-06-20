import "./style/style.css";

import { loadPokemon } from "./services/pokemonService";
import { DexView } from "./views/DexView";

const app =
  document.querySelector<HTMLDivElement>(
    "#app"
  );

if (!app) {
  throw new Error(
    "App element not found"
  );
}

async function main() {
  const pokemon = await loadPokemon();

  const dexView = new DexView(
    app,
    pokemon
  );

  dexView.render();
}

main();