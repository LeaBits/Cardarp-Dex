import type { Dex } from "../models/Dex";

export function renderDexSubNav(
  dexes: Dex[],
  activeDexId: string | null
): string {
  const activeDex = dexes.find(dex => dex.id === activeDexId);

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

        <div class="dex-subbar-actions">
          ${
            activeDex
              ? `
                <button
                  id="rename-dex-button"
                  type="button"
                  class="btn btn-default btn-sm"
                >
                  Edit
                </button>

                <button
                  id="delete-dex-button"
                  type="button"
                  class="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              `
              : ""
          }

          <form id="create-dex-form" class="dex-subbar-form">
            <input
              id="new-dex-name"
              placeholder="New dex"
            />

            <button type="submit" class="btn btn-primary btn-sm">
              Add
            </button>
          </form>
        </div>
      </div>
    </nav>
  `;
}