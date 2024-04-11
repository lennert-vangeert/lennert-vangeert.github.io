import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import { register } from "@core/modules/auth/auth.api";
import * as Storage from "@core/storage";
import { Router } from "@vaadin/router";

import "@components/design/Utils/ErrorView";
import { defaultStyles, formStyles } from "../../style/styles";

@customElement("register-page")
class Register extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;

  handleSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordRepeat = formData.get("passwordRepeat") as string;

    this.isLoading = true;
    if (password !== passwordRepeat) {
      this.isLoading = false;
      this.error = "Passwords do not match";
      return;
    }

    register({ email, password, firstName, lastName })
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
      <section class="register">
        <div class="register__inner">
          <div class="register__title">
            <h1 class="register__title-text">Register</h1>
            ${error ? html`<error-view error=${error} />` : ""}
          </div>
          <form @submit=${this.handleSubmit} action="#" class="main__form">
            <label for="firstName" class="main__form-label">
              <p class="label__text">First name</p>
              <input
                autofocus
                type="text"
                name="firstName"
                class="main__form-input"
                placeholder="First name"
                required
              />
            </label>
            <label for="lastName" class="main__form-label">
              <p class="label__text">Last name</p>
              <input
                type="text"
                name="lastName"
                class="main__form-input"
                placeholder="Last name"
                required
              />
            </label>
            <label for="email" class="main__form-label">
              <p class="label__text">E-mail</p>
              <input
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
            <label for="passwordRepeat" class="main__form-label">
              <p class="label__text">Repeat password</p>
              <input
                type="password"
                name="passwordRepeat"
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
              Register
            </button>
            <a class="login__anchor" href="/login">Login</a>
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
      .register {
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
      .register__inner {
        padding: 3rem 5rem;
      }
      .register__title {
        font-weight: 700;
        color: #222;
        padding: 0 1rem;
        text-align: center;
        height: 100%;
      }
      .login__anchor {
        width: 100%;
        text-align: right;
        text-decoration: underline;
        color: inherit;
      }
    `,
  ];
}

export default Register;
