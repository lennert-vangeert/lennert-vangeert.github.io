import { User } from "@core/modules/auth/auth.types";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import * as Storage from "../../core/storage";
import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import { getCurrentUser } from "@core/modules/auth/auth.api";
import { API } from "@core/network/api";
import { AxiosError, AxiosResponse } from "axios";
import { Router } from "@vaadin/router";
import { defaultStyles } from "../../style/styles";

export const logout = () => {
  Storage.saveAuthToken(null);
  Router.go("/login");
};

@customElement("auth-container")
class AuthContainer extends LitElement {
  @property()
  user: User | null = null;
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;

  connectedCallback(): void {
    super.connectedCallback();

    API.interceptors.request.use((config) => {
      const token = Storage.getAuthToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    API.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.user = null;
          logout();
        }
        return Promise.reject(error);
      }
    );

    // fetch user
    this.isLoading = true;
    getCurrentUser()
      .then(({ data }) => {
        this.user = data;
      })
      .catch((error) => {
        this.error = error.message;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  render() {
    const { isLoading, error, user } = this;

    if (error) {
      return html`<error-view error=${error} />`;
    }

    if (isLoading || !user) {
      return html`<loading-indicator></loading-indicator>`;
    }

    return html`
      <header-navigation></header-navigation>
      <section class="content">
        <app-container>
          <slot></slot>
        </app-container>
      </section>
    `;
  }

  static styles = [
    defaultStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ];
}

export default AuthContainer;
