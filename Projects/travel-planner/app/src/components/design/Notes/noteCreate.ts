import { createNote } from "@core/modules/notes/notes.api";
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { goBack } from "@core/modules/utils/goBack";

import "@components/design/Utils/pageTitle";
import "@components/design/Notes/form/noteFormCreate";
import "@components/design/Utils/buttons/secondaryButton";
import "@components/design/Utils/containers/formContainer";
@customElement("note-create")
class NoteCreate extends LitElement {
  render() {
    return html`
    <form-container>
      <page-title>Create note</page-title>
      <secondary-button @click=${() => goBack()}>Go back</secondary-button>
      <note-form-create .method=${createNote}></note-form-create>
      </form-container>
    `;
  }
}

export default NoteCreate;
