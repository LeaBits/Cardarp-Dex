import type { Dex } from "../models/Dex";

export function renderDexSubNav(
  dexes: Dex[],
  activeDexId: string | null
): string {
  return `
    <nav class="dex-subbar">
      <div class="container">
        <ul class="dex-subbar-list">
          ${dexes
            .map(
              dex => `
                <li class="${dex.id === activeDexId ? "active" : ""}">
                  <a href="#" class="dex-link" data-dex-id="${dex.id}">
                    ${dex.name}
                  </a>
                </li>
              `
            )
            .join("")}
        </ul>

        <form id="create-dex-form" class="dex-subbar-form">
          <input
            id="new-dex-name"
            placeholder="New dex"
          />

          <button type="submit">
            Add
          </button>
        </form>
      </div>
    </nav>
  `;
}