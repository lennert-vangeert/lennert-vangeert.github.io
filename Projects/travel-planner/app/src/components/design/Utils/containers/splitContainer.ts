import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "../../../../style/styles";

@customElement("split-container")
export class SplitContainer extends LitElement {
  render() {
    return html`<slot></slot> `;
  }

  static styles = [
    defaultStyles,
    css`
      :host {
        width: 100%;
        max-width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 1rem;
      }
      @media (max-width: 768px) {
        :host {
          flex-direction: column;
        }
    `,
  ];
}

export default SplitContainer;
