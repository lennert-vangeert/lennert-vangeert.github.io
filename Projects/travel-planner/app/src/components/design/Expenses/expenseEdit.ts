import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { updateExpense } from "@core/modules/expenses/expenses.api";
import { goBack } from "@core/modules/utils/goBack";

import "@components/design/Utils/pageTitle";
import "@components/design/Expenses/form/expenseFormEdit";
import "@components/design/Utils/buttons/secondaryButton";
import "@components/design/Utils/containers/formContainer";

@customElement("expense-edit")
class ExpenseEdit extends LitElement {
  render() {
    return html`
      <form-container>
        <page-title>Edit expense</page-title>
        <secondary-button @click=${() => goBack()}>Go back</secondary-button>
        <expense-form-edit .method=${updateExpense}></expense-form-edit>
      </form-container>
    `;
  }
}

export default ExpenseEdit;
