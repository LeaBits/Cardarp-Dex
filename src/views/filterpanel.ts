import {
  formGroups,
  formatFormGroup,
  type FormGroup
} from "../models/forms";

export function renderFilterPanel(
  enabledFormGroups: Set<FormGroup>
): string {
  return `
    <section class="filters panel panel-default">

      <div class="panel-heading">
        <h2 class="panel-title">
          Special forms
        </h2>
      </div>

      <div class="panel-body">

        <div class="filter-actions">
          <button
            id="show-all-forms"
            class="btn btn-default btn-sm"
          >
            Show all
          </button>

          <button
            id="hide-all-forms"
            class="btn btn-default btn-sm"
          >
            Hide all
          </button>
        </div>

        ${formGroups
          .map(
            group => `
              <label class="checkbox-inline">

                <input
                  type="checkbox"
                  class="form-filter"
                  value="${group}"
                  ${enabledFormGroups.has(group) ? "checked" : ""}
                />

                ${formatFormGroup(group)}

              </label>
            `
          )
          .join("")}

      </div>

    </section>
  `;
}