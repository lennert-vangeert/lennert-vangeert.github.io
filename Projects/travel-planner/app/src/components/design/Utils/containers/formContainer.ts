import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import "@components/design/Utils/pageTitle";
import "@components/design/Utils/buttons/secondaryButton";
import "@components/design/User/form/userFormEdit";
import { defaultStyles } from "../../../../style/styles";

@customElement("form-container")
class FormContainer extends LitElement {
  render() {
    return html` <slot></slot> `;
  }
  static styles = [
    defaultStyles,
    css`
      :host {
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        width: 30vw;
        min-width: 210px;
        max-width: 500px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2rem;
      }
    `,
  ];
}

export default FormContainer;
