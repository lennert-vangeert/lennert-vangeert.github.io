import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import { login } from "@core/modules/auth/auth.api";
import * as Storage from "@core/storage";
import { Router } from "@vaadin/router";

import "@components/design/Utils/ErrorView";
import { defaultStyles, formStyles } from "../../style/styles";

@customElement("login-page")
class Login extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;

  handleSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    this.isLoading = true;

    login({ email, password })
      .then(({ data }) => {
        this.isLoading = false;
        Storage.saveAuthToken(data.token);
        Router.go("/");
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  }

  render() {
    const { isLoading, error } = this;

    return html`
      ${error ? html`<error-view error=${error} />` : ""}
      <section class="login">
        <div class="login__inner">
          <div class="login__title">
            <h1 class="login__title-text">Login</h1>
          </div>
          <form @submit=${this.handleSubmit} action="#" class="main__form">
            <label for="email" class="main__form-label">
              <p class="label__text">E-mail</p>
              <input
                autofocus
                type="email"
                name="email"
                class="main__form-input"
                placeholder="email"
                required
              />
            </label>
            <label for="password" class="main__form-label">
              <p class="label__text">Password</p>
              <input
                type="password"
                name="password"
                class="main__form-input"
                placeholder="password"
                required
              />
            </label>
            <button
              class="main__form-button"
              type="submit"
              ?disabled=${isLoading}
            >
              Login
            </button>
            <a class="register__anchor" href="/register">Register</a>
          </form>
        </div>
      </section>
    `;
  }

  static styles = [
    defaultStyles,
    formStyles,
    css`
      :host {
        font-family: var(--main-font);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
      }
      .login {
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
      .login__inner {
        padding: 3rem 5rem;
      }
      .login__title {
        font-weight: 700;
        color: #222;
        padding: 0 1rem;
        text-align: center;
        height: 100%;
      }
      .register__anchor {
        width: 100%;
        text-align: right;
        text-decoration: underline;
        color: inherit;
      }
    `,
  ];
}

export default Login;
