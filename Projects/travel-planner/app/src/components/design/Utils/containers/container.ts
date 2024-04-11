import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "../../../../style/styles";

@customElement("container-item")
export class ContainerItem extends LitElement {
  render() {
    return html`<slot></slot> `;
  }

  static styles = [
    defaultStyles,
    css`
      :host {
        display: block;
        padding: 2rem 1rem;
        margin: 0 auto;
        width: 100vw;
      }
    `,
  ];
}

export default ContainerItem;
