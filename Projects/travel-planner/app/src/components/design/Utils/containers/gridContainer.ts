import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "../../../../style/styles";

@customElement("grid-container")
export class GridContainer extends LitElement {
  render() {
    return html`<slot></slot> `;
  }

  static styles = [
    defaultStyles,
    css`
      :host {
        display: grid;
        grid-template-columns: auto auto auto auto;);
        jusitfy-content: start;
        align-items: center;
        padding: 1rem auto;
        margin: 3rem auto;
        max-width: 100rem;
      }
      @media (max-width: 1200px) {
        :host {
          grid-template-columns: auto auto;
        }
        @media (max-width: 850px) {
          :host {
            grid-template-columns: auto;
            width: 100vw;
            justify-content: center;
            align-items: center;
          }
    `,
  ];
}

export default GridContainer;
