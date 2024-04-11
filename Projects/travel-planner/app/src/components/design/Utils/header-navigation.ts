import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "../../../style/styles";
import { logout } from "@components/auth/authContainer";
import { User } from "@core/modules/auth/auth.types";
import { router } from "@core/router";
import { getCurrentUser } from "@core/modules/auth/auth.api";

@customElement("header-navigation")
export class Navigation extends LitElement {
  @property()
  user: User | null = null;

  handleLogout = () => {
    logout();
  };
  @property({ type: Object }) location = router.location;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(
      "vaadin-router-location-changed",
      this.handleRouteChange
    );
    this.fetchItem();
  }

  handleRouteChange = () => {
    // location update to trigger re-render
    this.location = router.location;
  };

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(
      "vaadin-router-location-changed",
      this.handleRouteChange
    );
  }

  fetchItem() {
    getCurrentUser()
      .then(({ data }) => {
        this.user = data;
        console.log(data);
      })
      .catch((error) => {
        this.user = {
          _id: "",
          firstName: "Not",
          lastName: "Found",
          email: "",
        };
        console.log(error);
      });
  }

  render() {
    return html`
      <header class="header">
      <div class="header__inner">
          <a href="/" class="header__logo">
          <img class="header__logo" src="/logo.svg" alt="logo" />
          </a>

        <nav class="header__nav">
          <a class="header__nav-anchor" href="/users/edit"
            >${this.user?.firstName} ${this.user?.lastName}
          </a>
          <a class="header__nav-anchor" @click=${this.handleLogout}>Logout</a>
        </nav>
        </div>
      </header>
    `;
  }

  static styles = [
    defaultStyles,
    css`
      .header {
        height: 7rem;
        width: 150px;
        display: flex;
        align-items: center;
        background-color: var(--main-blue);
        border-radius: 0 0 1.5rem 0;
        transition: all 0.3s ease-in-out;
        padding: 0 1rem;

      }
      .header:hover {
        width: 40vw;
        transition: all 0.s ease-in-out;
      }
      .header:hover .header__nav {
        display: flex;
        transition: all 0.3s ease-in-out;
        delay: 0.3s;
      }
      .header:hover .header__inner {
        width: 90%;
      }
      .header__inner {
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .header__logo {
        height: 5rem;
        cursor: pointer;
      }
      .header__nav {
        gap: 2rem;
        display: none;
      }
      .header__nav-anchor {
        text-decoration: none;
        color: inherit;
        font-size: 1.5rem;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
      }
      .header__nav-anchor:hover {
        scale: 1.1;
      }

      @media screen and (max-width: 768px) {
        .header {
          height: 5rem;
          max-height: 5rem;
        }
        .header__logo {
          height: 3rem;
        }
        .header__nav-anchor {
          font-size: 1rem;
        }
      }
      @media screen and (max-width: 500px) {
        .header {
          width: 100vw;
          border-radius: 0;
        }
        .header__nav {
          display: flex;
          transition: all 0.3s ease-in-out;
          delay: 0.3s;
        }
        .header__inner {
          width: 90vw;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header__logo {
          height: 3rem;
        }
        .header__nav-anchor {
          font-size: 1rem;
        }
      }
    `,
  ];
}
