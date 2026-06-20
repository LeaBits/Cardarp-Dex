import "./style/style.css";

import type { User } from "firebase/auth";

import { observeAuth } from "./services/authService";
import { loadPokemon } from "./services/pokemonService";
import { createDex, loadDexes } from "./services/dexService";

import type { Dex } from "./models/Dex";
import { DexView } from "./views/DexView";
import { renderNavbar } from "./views/Navbar";
import { renderDexSubNav } from "./views/DexSubNav";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App element not found");
}

let currentUser: User | null = null;
let pokemonCache: Awaited<ReturnType<typeof loadPokemon>> | null = null;
let dexes: Dex[] = [];
let activeDexId: string | null = null;

async function getPokemon() {
  if (!pokemonCache) {
    pokemonCache = await loadPokemon();
  }

  return pokemonCache;
}

async function reloadDexes(uid: string) {
  dexes = await loadDexes(uid);

  if (!activeDexId && dexes.length > 0) {
    activeDexId = dexes[0].id;
  }

  if (activeDexId && !dexes.some(dex => dex.id === activeDexId)) {
    activeDexId = dexes[0]?.id ?? null;
  }
}

async function renderApp(user: User | null) {
  currentUser = user;

  app.innerHTML = `
    <div id="navbar-root"></div>
    <div id="dex-subnav-root"></div>

    <main class="container">
      <div id="dex-root"></div>
    </main>
  `;

  const navbarRoot = document.querySelector<HTMLElement>("#navbar-root");
  const subnavRoot = document.querySelector<HTMLElement>("#dex-subnav-root");
  const dexRoot = document.querySelector<HTMLDivElement>("#dex-root");

  if (!navbarRoot || !subnavRoot || !dexRoot) {
    return;
  }

  renderNavbar(navbarRoot, user);

  if (!user) {
    activeDexId = null;
    dexes = [];

    subnavRoot.innerHTML = "";
    dexRoot.innerHTML = `
      <div class="jumbotron text-center">
        <h2>Welcome to Cardarp Dex</h2>
        <p>Sign in with Google to track your collection.</p>
      </div>
    `;

    return;
  }

  dexRoot.innerHTML = `
    <img class="loading" src="/images/loading-buffering.gif" alt="Loading" />
  `;

  await reloadDexes(user.uid);
  await renderDexArea();
}

async function renderDexArea() {
  if (!currentUser) {
    return;
  }

  const subnavRoot = document.querySelector<HTMLElement>("#dex-subnav-root");
  const dexRoot = document.querySelector<HTMLDivElement>("#dex-root");

  if (!subnavRoot || !dexRoot) {
    return;
  }

  subnavRoot.innerHTML = renderDexSubNav(dexes, activeDexId);
  bindDexSubNavEvents();

  const activeDex = dexes.find(dex => dex.id === activeDexId);

  if (!activeDex) {
    dexRoot.innerHTML = `
      <div class="alert alert-info">
        Create your first dex to get started.
      </div>
    `;
    return;
  }

  dexRoot.innerHTML = `
    <img class="loading" src="/images/loading-buffering.gif" alt="Loading" />
  `;

  const pokemon = await getPokemon();

  const dexView = new DexView(
    dexRoot,
    pokemon,
    currentUser.uid,
    activeDex,
    async () => {
      await reloadDexes(currentUser!.uid);
      await renderDexArea();
    }
  );

  dexView.render();
}

function bindDexSubNavEvents() {
  document
    .querySelector<HTMLFormElement>("#create-dex-form")
    ?.addEventListener("submit", async event => {
      event.preventDefault();

      if (!currentUser) {
        return;
      }

      const input = document.querySelector<HTMLInputElement>("#new-dex-name");
      const name = input?.value.trim();

      if (!name) {
        return;
      }

      activeDexId = await createDex(currentUser.uid, name);

      await reloadDexes(currentUser.uid);
      await renderDexArea();
    });

  document.querySelectorAll<HTMLAnchorElement>(".dex-link").forEach(link => {
    link.addEventListener("click", async event => {
      event.preventDefault();

      activeDexId = event.currentTarget.dataset.dexId ?? null;

      await renderDexArea();
    });
  });
}

observeAuth(user => {
  renderApp(user);
});