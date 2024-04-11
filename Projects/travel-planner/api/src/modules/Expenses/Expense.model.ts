import mongoose from "mongoose";
import validateModel from "../../validation/validateModel";
import { Expense } from "./Expense.types";

const expenseSchema = new mongoose.Schema<Expense>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

expenseSchema.virtual("trip", {
  ref: "Trip",
  localField: "tripId",
  foreignField: "_id",
  justOne: true,
});

expenseSchema.pre("save", function (next) {
  validateModel(this);
  next();
});


const expenseModel = mongoose.model<Expense>("Expense", expenseSchema);

export default expenseModel;