import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { updateUser } from "@core/modules/users/users.api";
import { goBack } from "@core/modules/utils/goBack";
import { defaultStyles, formStyles } from "../../../style/styles";

import "@components/design/Utils/pageTitle";
import "@components/design/Utils/buttons/secondaryButton";
import "@components/design/User/form/userFormEdit";
import "@components/design/Utils/containers/formContainer";

@customElement("user-edit")
class UserEdit extends LitElement {
  render() {
    return html`
      <form-container>
        <page-title>Edit account</page-title>
        <secondary-button @click=${() => goBack()}>Go back</secondary-button>
        <user-form-edit .method=${updateUser}></user-form-edit>
      </form-container>
    `;
  }
  static styles = [
    defaultStyles,
    formStyles,
    css`
      :host {
        max-width: 600px;
      }
    `,
  ];
}

export default UserEdit;
