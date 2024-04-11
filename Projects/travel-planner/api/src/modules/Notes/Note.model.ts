import mongoose from "mongoose";
import { Note } from "./Note.types";
import validateModel from "../../validation/validateModel";

const noteSchema = new mongoose.Schema<Note>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
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

noteSchema.virtual("trip", {
  ref: "Trip",
  localField: "tripId",
  foreignField: "_id",
  justOne: true,
});

noteSchema.pre("save", function (next) {
  validateModel(this);
  next();
});


const noteModel = mongoose.model<Note>("Note", noteSchema);

export default noteModel;