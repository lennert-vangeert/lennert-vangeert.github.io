import mongoose from "mongoose";
import validateModel from "../../validation/validateModel";
import { Activity } from "./Activity.types";

const activiySchema = new mongoose.Schema<Activity>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
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

activiySchema.virtual("trip", {
  ref: "Trip",
  localField: "tripId",
  foreignField: "_id",
  justOne: true,
});

activiySchema.pre("save", function (next) {
  validateModel(this);
  next();
});


const activityModel = mongoose.model<Activity>("Activity", activiySchema);

export default activityModel;