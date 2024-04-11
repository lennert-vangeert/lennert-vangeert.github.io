import mongoose from "mongoose";
import validateModel from "../../validation/validateModel";
import { Trip } from "./Trip.types";
import noteModel from "../Notes/Note.model";
import expenseModel from "../Expenses/Expense.model";
import activityModel from "../Activities/Activity.model";


const tripSchema = new mongoose.Schema<Trip>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//date format
// YYYY-MM-DD

tripSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

tripSchema.pre("deleteOne", { document: true, query: false }, function (next) {
  noteModel.deleteMany({ tripId: this._id }).exec();
  expenseModel.deleteMany({ tripId: this._id }).exec();
  activityModel.deleteMany({ tripId: this._id }).exec();

  next();
});

tripSchema.pre(["findOneAndDelete", "deleteMany"], function (next) {
  const id = this.getFilter()["_id"];
  noteModel.deleteMany({ tripId: id }).exec();
  expenseModel.deleteMany({ tripId: id }).exec();
  activityModel.deleteMany({ tripId: id }).exec();
  next();
});

const Tripmodel = mongoose.model<Trip>("Trip", tripSchema);

export default Tripmodel;
