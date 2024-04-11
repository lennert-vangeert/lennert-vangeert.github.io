import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "../../../style/styles";

@customElement("secondary-title")
class SecondaryTitle extends LitElement {
  render() {
    return html`<slot></slot> `;
  }

  static styles = [
    defaultStyles,
    css`
      :host {
        margin-bottom: 1rem;
        margin-top: 1.8rem;
        display: block;
        font-size: 1.5rem;
        font-weight: 400;
        font-family: var(--main-font);
      }
    `,
  ];
}

export default SecondaryTitle;
