import type { User } from "firebase/auth";
import { login, logout } from "../services/authService";

export function renderAuthView(
  container: HTMLElement,
  user: User | null
) {
  if (!user) {
    container.innerHTML = `
      <button
        id="google-login"
        class="btn btn-primary"
      >
        Sign in with Google
      </button>
    `;

    document
      .querySelector("#google-login")
      ?.addEventListener("click", () => {
        login();
      });

    return;
  }

  container.innerHTML = `
    <div class="auth-user">
        ${
        user.photoURL
            ? `<img
                class="auth-avatar"
                src="${user.photoURL}"
                alt=""
                referrerpolicy="no-referrer"
                />`
            : ""
        }

        <span>${user.displayName ?? user.email ?? "Signed in"}</span>

        <button id="logout" class="btn btn-default btn-sm">
        Logout
        </button>
    </div>
    `;

  document
    .querySelector("#logout")
    ?.addEventListener("click", () => {
      logout();
    });
}