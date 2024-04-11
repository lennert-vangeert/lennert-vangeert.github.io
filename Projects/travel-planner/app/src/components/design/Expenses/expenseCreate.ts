import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { createExpense } from "@core/modules/expenses/expenses.api";
import { goBack } from "@core/modules/utils/goBack";

import "@components/design/Utils/pageTitle";
import "@components/design/Expenses/form/expenseFormCreate";
import "@components/design/Utils/buttons/secondaryButton";
import "@components/design/Utils/containers/container";
import "@components/design/Utils/containers/formContainer";

@customElement("expense-create")
class ExpenseCreate extends LitElement {
  render() {
    return html`
        <form-container>
        <page-title>Create expense</page-title>
        <secondary-button @click=${() => goBack()}>Go back</secondary-button>
        <expense-form-create .method=${createExpense}></expense-form-create>
        </form-container>
    `;
  }
}

export default ExpenseCreate;
