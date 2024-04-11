import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "../../../style/styles";

@customElement("page-title")
class PageTitle extends LitElement {
  render() {
    return html`<slot></slot> `;
  }

  static styles = [
    defaultStyles,
    css`
      :host {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 3rem;
        font-weight: 700;
        font-family: var(--main-font);
        margin: 0 0 1.5rem 0;
      }
    `,
  ];
}

export default PageTitle;
