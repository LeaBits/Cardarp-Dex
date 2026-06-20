import type { User } from "firebase/auth";
import { login, logout } from "../services/authService";

export function renderNavbar(
  container: HTMLElement,
  user: User | null
) {
  container.innerHTML = `
    <nav class="navbar navbar-default main-navbar">
      <div class="container">

        <a class="navbar-brand" href="#">
          <img
            src="/images/logo.png"
            alt="Cardarp Dex"
            class="navbar-logo"
          />

          <span>Cardarp Dex</span>
        </a>

        <div class="navbar-user-area">
          ${
            user
              ? `
                <span class="navbar-user">
                  ${user.displayName ?? user.email}
                </span>

                <a
                  href="#"
                  id="logout-link"
                  class="navbar-link"
                >
                  Logout
                </a>
              `
              : `
                <a
                  href="#"
                  id="login-link"
                  class="navbar-link"
                >
                  Sign in with Google
                </a>
              `
          }
        </div>

      </div>
    </nav>
  `;

  document
    .querySelector("#login-link")
    ?.addEventListener("click", event => {
      event.preventDefault();
      login();
    });

  document
    .querySelector("#logout-link")
    ?.addEventListener("click", event => {
      event.preventDefault();
      logout();
    });
}