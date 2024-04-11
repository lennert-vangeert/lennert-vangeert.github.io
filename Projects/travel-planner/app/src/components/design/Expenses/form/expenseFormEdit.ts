import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import { defaultStyles, formStyles } from "../../../../style/styles";
import { AxiosResponse } from "axios";
import { Trip } from "@core/modules/trips/trips.types";
import { goBack } from "@core/modules/utils/goBack";
import {
  Expense,
  ExpenseBody,
  FullExpense,
} from "@core/modules/expenses/expenses.types";
import { getExpenseById } from "@core/modules/expenses/expenses.api";

@customElement("expense-form-edit")
class ExpenseFormEdit extends LitElement {
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
  expense: Expense | null = null;
  @property()
  trip: Trip | null = null;
  @property()
  submitLabel: String = "edit expense";
  @property()
  method:
    | ((expense: ExpenseBody, id: string) => Promise<AxiosResponse<Expense>>)
    | null = null;
  @property()
  onSuccess: (() => void) | null = null;
  @property()
  expenseId: string = window.location.search.split("=")[1];

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchExpense();
  }
  fetchExpense() {
    getExpenseById(this.expenseId)
      .then(({ data }) => {
        this.expense = data;
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
    const expense = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      amount: formData.get("amount") as string,
    };
    this.isLoading = true;
    this.method(expense, window.location.search.split("=")[1])
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
    const { isLoading, handleSubmit, error, submitLabel, expense } = this;
      return html`
        ${error ? html`<error-view error=${error} />` : ""}
        <form @submit=${handleSubmit}>
          <label for="title" class="main__form-label">
            <p class="label__text">Title</p>
            <input
              type="text"
              name="title"
              class="main__form-input"
              placeholder="New shoes"
              autofocus="autofocus"
              .value=${expense?.title}
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
              .value=${expense?.description}
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
              .value=${expense?.amount}
              required
            />
          </label>
          <button
            class="main__form-button"
            type="submit"
            ?disabled=${isLoading}
          >
            ${submitLabel}
          </button>
        </form>
      `;
  }

  static styles = [defaultStyles, formStyles];
}

export default ExpenseFormEdit;
