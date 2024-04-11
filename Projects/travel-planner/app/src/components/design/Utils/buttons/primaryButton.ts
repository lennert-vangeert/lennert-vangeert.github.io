import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "../../../../style/styles";

@customElement("primary-button")
export class PrimaryButton extends LitElement {
  render() {
    return html`<slot></slot> `;
  }

  static styles = [
    defaultStyles,
    css`
      :host {
        padding: 0.5rem 0.5rem;
        border: 1px solid #ccc;
        outline: none;
        background-color: #00ffff;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        text-align: center;
      }
      :host:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        transition: all 0.3s ease-in-out;
      }
    `,
  ];
}

export default PrimaryButton;
