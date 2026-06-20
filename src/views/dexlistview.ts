import type { Dex } from "../models/Dex";

export function renderDexList(
  dexes: Dex[]
): string {
  return `
    <div class="panel panel-default">

      <div class="panel-heading">
        Your Dexes
      </div>

      <div class="panel-body">

        <form id="create-dex-form">
          <div class="input-group">

            <input
              id="dex-name"
              class="form-control"
              placeholder="New Dex Name"
            />

            <span class="input-group-btn">
              <button
                class="btn btn-primary"
                type="submit"
              >
                Create
              </button>
            </span>

          </div>
        </form>

        <hr>

        <ul class="list-group">
          ${dexes
            .map(
              dex => `
                <li
                  class="list-group-item"
                  data-dex-id="${dex.id}"
                >
                  ${dex.name}
                </li>
              `
            )
            .join("")}
        </ul>

      </div>

    </div>
  `;
}