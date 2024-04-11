import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "../../../../style/styles";

@customElement("app-container")
export class Container extends LitElement {
  render() {
    return html`<slot></slot> `;
  }

  static styles = [
    defaultStyles,
    css`
      :host {
        display: block;
        padding: 2rem 1rem;
        width: 100%;
        margin: 0 auto;
      }
    `,
  ];
}
