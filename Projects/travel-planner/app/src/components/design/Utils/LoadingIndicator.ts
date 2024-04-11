import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "../../../style/styles";

@customElement("loading-indicator")
export class LoadingIndicator extends LitElement {
  @property()
  isVisible: boolean = false;

  timeoutId: any | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    // only show loading after 1000ms (to prevent flickering when loading is fast)
    this.timeoutId = setTimeout(() => {
      this.isVisible = true;
    }, 1000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
  render() {
    if (!this.isVisible) {
      return html``;
    }
    return html`<div class="spinner"></div>`;
  }

  static styles = [
    defaultStyles,
    css`
      .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 9px solid #474bff;
        animation: spinner-bulqg1 0.8s infinite linear alternate,
          spinner-oaa3wk 1.6s infinite linear;
      }

      @keyframes spinner-bulqg1 {
        0% {
          clip-path: polygon(
            50% 50%,
            0 0,
            50% 0%,
            50% 0%,
            50% 0%,
            50% 0%,
            50% 0%
          );
        }

        12.5% {
          clip-path: polygon(
            50% 50%,
            0 0,
            50% 0%,
            100% 0%,
            100% 0%,
            100% 0%,
            100% 0%
          );
        }

        25% {
          clip-path: polygon(
            50% 50%,
            0 0,
            50% 0%,
            100% 0%,
            100% 100%,
            100% 100%,
            100% 100%
          );
        }

        50% {
          clip-path: polygon(
            50% 50%,
            0 0,
            50% 0%,
            100% 0%,
            100% 100%,
            50% 100%,
            0% 100%
          );
        }

        62.5% {
          clip-path: polygon(
            50% 50%,
            100% 0,
            100% 0%,
            100% 0%,
            100% 100%,
            50% 100%,
            0% 100%
          );
        }

        75% {
          clip-path: polygon(
            50% 50%,
            100% 100%,
            100% 100%,
            100% 100%,
            100% 100%,
            50% 100%,
            0% 100%
          );
        }

        100% {
          clip-path: polygon(
            50% 50%,
            50% 100%,
            50% 100%,
            50% 100%,
            50% 100%,
            50% 100%,
            0% 100%
          );
        }
      }

      @keyframes spinner-oaa3wk {
        0% {
          transform: scaleY(1) rotate(0deg);
        }

        49.99% {
          transform: scaleY(1) rotate(135deg);
        }

        50% {
          transform: scaleY(-1) rotate(0deg);
        }

        100% {
          transform: scaleY(-1) rotate(-135deg);
        }
      }
    `,
  ];
}
