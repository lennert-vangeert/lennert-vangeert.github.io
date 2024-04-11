import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import { defaultStyles, formStyles } from "../../../../style/styles";
import { Router } from "@vaadin/router";
import { FullNote, Note, NoteBody } from "@core/modules/notes/notes.types";
import { AxiosResponse } from "axios";
import { Trip } from "@core/modules/trips/trips.types";

@customElement("note-form-create")
class NoteFormCreate extends LitElement {
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
  trips: Array<Trip> | null = null;
  @property()
  submitLabel: String = "Add note";
  @property()
  method:
    | ((note: NoteBody, id?: string) => Promise<AxiosResponse<Note>>)
    | null = null;
  @property()
  onSuccess: (() => void) | null = null;

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
  }

  handleSubmit = (event: Event) => {
    if (!this.method) {
      return;
    }

    event.preventDefault();
    const tripId = window.location.search.split("=")[1];

    const formData = new FormData(event.target as HTMLFormElement);
    const note = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tripId: tripId,
    };
    this.isLoading = true;
    this.method(note)
      .then(({ data }) => {
        if (this.onSuccess) {
          console.log(data);
          this.onSuccess();
        }
        Router.go(`/trips/${tripId}`);
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  };

  render() {
    const { isLoading, handleSubmit, data, error, submitLabel } = this;

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
            .value=${data.title}
            required
          />
        </label>
        <label for="content" class="main__form-label">
          <p class="label__text">Note</p>
          <textarea
            name="content"
            class="main__form-input"
            placeholder="Don't forget to bring your passport!"
            .value=${data.content}
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

export default NoteFormCreate;
