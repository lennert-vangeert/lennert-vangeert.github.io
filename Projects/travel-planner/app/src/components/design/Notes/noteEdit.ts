import { updateNote } from "@core/modules/notes/notes.api";
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { goBack } from "@core/modules/utils/goBack";

import "@components/design/Utils/pageTitle";
import "@components/design/Notes/form/noteFormEdit";
import "@components/design/Utils/buttons/secondaryButton";
import "@components/design/Utils/containers/formContainer";
@customElement("note-edit")
class NoteEdit extends LitElement {
  render() {
    return html`
      <form-container>
        <page-title>Edit note</page-title>
        <secondary-button @click=${() => goBack()}>Go back</secondary-button>
        <note-form-edit .method=${updateNote}></note-form-edit>
      </form-container>
    `;
  }
}

export default NoteEdit;
