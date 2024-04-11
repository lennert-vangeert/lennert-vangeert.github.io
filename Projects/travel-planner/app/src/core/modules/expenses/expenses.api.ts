import { API } from "@core/network/api";
import qs from "query-string";
import { Expense, ExpenseBody } from "./expenses.types";

type Query = {
  tripId?: string;
};

const getExpenses = (query: Query = {}) => {
  return API.get<Expense[]>(`/expenses?${qs.stringify(query)}`);
};

const getExpenseById = (id: string) => {
  return API.get<Expense>(`/expenses/${id}`);
};

const createExpense = (expense: ExpenseBody) => {
  return API.post<Expense>("expenses", expense);
};

const updateExpense = (expense: ExpenseBody, id: string) => {
  console.log(id, expense);
  return API.patch<Expense>(`/expenses/${id}`, expense);
};

const deleteExpenses = (id: string) => {
  return API.delete<Expense>(`/expenses/${id}`);
};

export { getExpenses, getExpenseById, createExpense, updateExpense, deleteExpenses };
