import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import { customElement, property } from "lit/decorators.js";
import { LitElement, css, html } from "lit";
import { Note } from "@core/modules/notes/notes.types";
import { getNotes } from "@core/modules/notes/notes.api";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";

@customElement("note-overview")
class NoteOverview extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  notes: Array<Note> | null = null;
  @property()
  error: string | null = null;
  @property()
  tripId: string | null = null;

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchItems();
  }

  fetchItems() {
    this.isLoading = true;

    let filters = {};
    if (this.tripId) {
      filters = { tripId: this.tripId };
    }

    getNotes(filters)
      .then(({ data }) => {
        this.notes = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  render() {
    const { isLoading, notes, error } = this;

    let content = html``;

    if (error) {
      content = html`<p>You have no notes</p>
        <a href="/notes/create?tripId=${this.tripId}">Add note</a>`;
    } else if (isLoading || !notes) {
      content = html`<loading-indicator></loading-indicator>`;
    } else {
      content = html`
        <div class="list">
          ${notes.map((n) => {
            return html`
              <article class="note">
                <h2 class="note__title">${n.title}</h2>
                <p class="note__content">${n.content}</p>
                <div class="anchor__container">
                  <a class="note__anchor" href="/notes/edit?noteId=${n._id}"
                    >Edit</a
                  >
                  <a
                    class="note__anchor red"
                    href="/notes/delete?noteId=${n._id}"
                    >Delete</a
                  >
                </div>
              </article>
            `;
          })}
        </div>
        <a href="/notes/create?tripId=${this.tripId}">Add note</a>
      `;
    }

    return html` ${content}`;
  }
  static styles = [
    css`
    .list {
        display: grid;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        max-width: 70rem;
    }
      .note {
        border: 1px solid #ccc;
        padding: 2rem;
        padding: 8px;
        margin-bottom: 8px;
        width: fit-content;
        max-width: 20rem;
        min-width: 10rem;
        min-height: 10rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .note__title {
        margin: 0;
      }
      .note__content {
        margin: 0;
      }
      .note__anchor {
        text-decoration: underline;
        color: #000;
        margin: 0 0.2rem;
      }
      .red {
        color: red;
      }
      .anchor__container {
        width: 100%;
        text-align: right;
      }
    `,
  ];
}

export default NoteOverview;
