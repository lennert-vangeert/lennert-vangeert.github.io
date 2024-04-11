import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "../../../../style/styles";

@customElement("secondary-button")
export class SecondaryButton extends LitElement {
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
        background-color: #fff;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
      }
    `,
  ];
}

export default SecondaryButton;
