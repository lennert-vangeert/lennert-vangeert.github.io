import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import { defaultStyles, formStyles } from "../../../../style/styles";
import { Router } from "@vaadin/router";
import { AxiosResponse } from "axios";
import { Trip } from "@core/modules/trips/trips.types";
import { Expense, ExpenseBody, FullExpense } from "@core/modules/expenses/expenses.types";

@customElement("expense-form-create")
class ExpenseFormCreate extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  data: FullExpense = {
    title: "",
    description: "",
    amount: "",
    tripId: "",
    userId: "",
  };
  @property()
  trips: Array<Trip> | null = null;
  @property()
  submitLabel: String = "Add expense";
  @property()
  method:
    | ((expense: ExpenseBody, id?: string) => Promise<AxiosResponse<Expense>>)
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
    const expense = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      amount: formData.get("amount") as string,
      tripId: tripId,
    };
    this.isLoading = true;
    this.method(expense)
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
          type="text"
          name="title"
          class="main__form-input"
          autofocus="autofocus"
          placeholder="New shoes"
          .value=${data.title}
          required
        />
      </label>
      <label for="description" class="main__form-label">
        <p class="label__text">description</p>
        <input
          type="text"
          name="description"
          class="main__form-input"
          placeholder="nikeshoes.com"
          .value=${data.description}
          required
        />
      </label>
      <label for="amount" class="main__form-label">
        <p class="label__text">Expense</p>
        <input
          type="number"
          min="0"
          name="amount"
          step="any"
          class="main__form-input"
          placeholder="120"
          .value=${data.amount}
          required
        />
      </label>
      <button class="main__form-button" type="submit" ?disabled=${isLoading}>
        ${submitLabel}
      </button>
    </form>
    `;
  }

  static styles = [defaultStyles, formStyles];
}

export default ExpenseFormCreate;
