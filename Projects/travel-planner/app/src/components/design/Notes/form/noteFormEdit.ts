import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import { defaultStyles, formStyles } from "../../../../style/styles";
import { FullNote, Note, NoteBody } from "@core/modules/notes/notes.types";
import { AxiosResponse } from "axios";
import { getNoteById } from "@core/modules/notes/notes.api";
import { getTripById } from "@core/modules/trips/trips.api";
import { Trip } from "@core/modules/trips/trips.types";
import { goBack } from "@core/modules/utils/goBack";

@customElement("note-form-edit")
class NoteFormEdit extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  data: FullNote = {
    title: "",
    content: "",
    tripId: "",
    userId: "",
  };
  @property()
  note: Note | null = null;
  @property()
  trip: Trip | null = null;
  @property()
  submitLabel: String = "edit note";
  @property()
  method:
    | ((note: NoteBody, id: string) => Promise<AxiosResponse<Note>>)
    | null = null;
  @property()
  onSuccess: (() => void) | null = null;
  @property()
  noteId: string = window.location.search.split("=")[1];

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchNote();
  }
  fetchNote() {
    getNoteById(this.noteId)
      .then(({ data }) => {
        this.note = data;
        // console.log(this.note);
      })
      .catch((error) => {
        this.error = error;
      });
  }
  fetchTrip() {
    getTripById(this.noteId)
      .then(({ data }) => {
        this.trip = data;
      })
      .catch((error) => {
        this.error = error;
      });
  }
  handleSubmit = (event: Event) => {
    if (!this.method) {
      return;
    }

    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const note = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };
    this.isLoading = true;
    this.method(note, window.location.search.split("=")[1])
      .then(({ data }) => {
        if (this.onSuccess) {
          console.log(data);
          this.onSuccess();
        }
        goBack();
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  };

  render() {
    const { isLoading, handleSubmit, error, submitLabel, note } = this;
      return html`
      ${error ? html`<error-view error=${error} />` : ""}
      <form @submit=${handleSubmit}>
        <label for="title" class="main__form-label">
          <p class="label__text">Title</p>
          <input
            name="title"
            autofocus
            class="main__form-input"
            placeholder="reminders"
            .value=${note?.title}
            required
          />
        </label>
        <label for="content" class="main__form-label">
          <p class="label__text">Note</p>
          <textarea
            name="content"
            class="main__form-input"
            placeholder="Don't forget to bring your passport!"
            .value=${note?.content}
            rows="4" cols="50"
            required
          /> </textarea>
        </label>
        <button class="main__form-button" type="submit" ?disabled=${isLoading}>
          ${submitLabel}
        </button>
      </form>
    `;
  }

  static styles = [defaultStyles, formStyles];
}

export default NoteFormEdit;
