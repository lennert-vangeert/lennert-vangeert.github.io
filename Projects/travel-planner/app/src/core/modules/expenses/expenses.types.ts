export type Expense = {
  _id?: string;
  title: string;
  description: string;
  amount: string;
};

export type FullExpense = Omit<Expense, "_id"> & {
  tripId: string;
  userId: string;
};

export type ExpenseBody = Omit<Expense, "_id">;
