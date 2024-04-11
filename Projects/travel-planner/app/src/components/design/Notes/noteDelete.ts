import { deleteNote } from "@core/modules/notes/notes.api";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles, deleteStyles } from "../../../style/styles";
import { goBack } from "@core/modules/utils/goBack";

import "@components/design/Utils/pageTitle";
import "@components/design/Notes/form/noteFormEdit";
import "@components/design/Utils/buttons/secondaryButton";
import "@components/design/Utils/containers/formContainer";

@customElement("note-delete")
class NoteDelete extends LitElement {
  @property()
  id: string = "";
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;

  connectedCallback(): void {
    super.connectedCallback();
  }

  handleDelete() {
    try {
      this.id = window.location.search.split("=")[1];
      deleteNote(this.id);
      goBack();
    } catch (error) {
      console.log(error);
    }
  }

  handleCancel() {
    goBack();
  }

  render() {
    return html`
      <form-container>
        <page-title>Delete note</page-title>
        <p>Are you sure you want to delete this note?</p>
        <div class="buttons">
          <button class="button__item cancel" @click="${this.handleCancel}">
            Cancel
          </button>
          <button class="button__item delete" @click="${this.handleDelete}">
            Delete
          </button>
        </div>
      </form-container>
    `;
  }
  static styles = [
    defaultStyles, deleteStyles,
  ];
}

export default NoteDelete;
