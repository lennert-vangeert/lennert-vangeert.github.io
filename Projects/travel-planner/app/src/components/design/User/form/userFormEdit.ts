import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { defaultStyles, formStyles } from "../../../../style/styles";
import { AxiosResponse } from "axios";
import { UserWithoutPassword } from "@core/modules/users/users.types";
import { getCurrentUser } from "@core/modules/auth/auth.api";
import { Router } from "@vaadin/router";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
@customElement("user-form-edit")
class UserFormEdit extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  data: UserWithoutPassword = {
    email: "",
    firstName: "",
    lastName: "",
  };
  @property()
  user: UserWithoutPassword | null = null;
  @property()
  submitLabel: String = "edit user";
  @property()
  method:
    | ((
        user: UserWithoutPassword
      ) => Promise<AxiosResponse<UserWithoutPassword>>)
    | null = null;
  @property()
  onSuccess: (() => void) | null = null;

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchUser();
  }
  fetchUser() {
    getCurrentUser()
      .then(({ data }) => {
        this.user = data;
        // console.log(this.note);
      })
      .catch((error) => {
        this.error = error;
      });
  }
  handleSubmit = (event: Event) => {
    if (!this.method) {
      return;
    }

    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const user = {
      email: formData.get("email") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
    };
    this.isLoading = true;
    this.method(user)
      .then(({ data }) => {
        if (this.onSuccess) {
          console.log(data);
          this.onSuccess();
        }
        Router.go("/")
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  };

  render() {
    const { isLoading, handleSubmit, error, submitLabel, user } = this;
    if (user) {
      return html`
        ${error ? html`<error-view error=${error} />` : ""}
        <form @submit=${handleSubmit} action="#" class="main__form">
          <label for="firstName" class="main__form-label">
            <p class="label__text">First name</p>
            <input
              autofocus
              type="text"
              name="firstName"
              class="main__form-input"
              placeholder="First name"
              value=${user.firstName}
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
              value=${user.lastName}
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
              value=${user.email}
              required
            />
          </label>
          <button
            class="main__form-button"
            type="submit"
            ?disabled=${isLoading}
          >
            ${submitLabel}
          </button>
        </form>
      `;
    }
  }

  static styles = [defaultStyles, formStyles];
}

export default UserFormEdit;

