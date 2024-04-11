import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "../../../style/styles";

@customElement("error-view")
export class ErrorView extends LitElement {
  @property()
  error: string = "";

  render() {
    return html`<p class="error">${this.error}</p>`;
  }
  static styles = [defaultStyles, css`
    .error {
      width: fit-content;
      background-color: #f8d7da;
      border-color: #f5c6cb;
      border-radius: .25rem;
      border: 1px solid red;
      color: red;
      margin: 1rem 0;
      padding: .5rem;
      

      
      `];
}
