import "@components/design/Utils/LoadingIndicator";
import "@components/design/Utils/ErrorView";
import { customElement, property } from "lit/decorators.js";
import { LitElement, css, html } from "lit";
import { Expense } from "@core/modules/expenses/expenses.types";
import { getExpenses } from "@core/modules/expenses/expenses.api";
import { tableStyles } from "../../../style/styles";

@customElement("expense-overview")
class ExpenseOverview extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  expenses: Array<Expense> | null = null;
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

    getExpenses(filters)
      .then(({ data }) => {
        this.expenses = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  render() {
    const { isLoading, expenses, error } = this;

    let content = html``;

    if (error) {
      content = html`<p>You have no expenses</p>
        <a href="/expenses/create?tripId=${this.tripId}">Add expense</a>`;
    } else if (isLoading || !expenses) {
      content = html`<loading-indicator></loading-indicator>`;
    } else {
      content = html`
        <table class="table">
          <tr class="table__row-head">
            <th class="table__head">Title</th>
            <th class="table__head">Description</th>
            <th class="table__head">Amount</th>
            <th class="table__head"></th>
            <th class="table__head"></th>
          </tr>
          ${expenses.map((ex) => {
            return html`
              <tr class="table__row">
                <td class="table__item">${ex.title}</td>
                <td class="table__item">${ex.description}</td>
                <td class="table__item">
                  ${new Intl.NumberFormat("be-BE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(parseFloat(ex.amount))}
                </td>
                <td class="table__item">
                  <a
                    class="table__item-anchor"
                    href="/expenses/edit?expenseId=${ex._id}"
                    >Edit</a
                  >
                </td>
                <td class="table__item">
                  <a
                    class="table__item-anchor red"
                    href="/expenses/delete?expenseId=${ex._id}"
                    >Delete</a
                  >
                </td>
              </tr>
            `;
          })}
          <tr class="table__row">
            <td class="table__item"></td>
            <td class="table__item right">Total</td>
            <td class="table__item">
            ${new Intl.NumberFormat("be-BE", {
              style: "currency",
              currency: "EUR",
            }).format(
              expenses.reduce((acc, ex) => acc + parseFloat(ex.amount), 0)
              )}
              </td>
              <td class="table__item"></td>
              <td class="table__item"></td>
          </tr>
        </table>
        <a href="/expenses/create?tripId=${this.tripId}">Add expense</a>
      `;
    }

    return html` ${content}`;
  }
  static styles = [
    tableStyles,
    css`
      .table__item-anchor {
        color: black;
      }
      .red {
        color: red;
      }
      .right {
        text-align: right;
      }
    `,
  ];
}

export default ExpenseOverview;
