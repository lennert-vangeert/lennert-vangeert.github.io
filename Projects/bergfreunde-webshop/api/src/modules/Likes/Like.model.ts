import mongoose from "mongoose";
import validateModel from "../../validation/validateModel";
import { Like } from "./Like.types";


const likeSchema = new mongoose.Schema<Like>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//date format
// YYYY-MM-DD

likeSchema.pre("save", function (next) {
  validateModel(this);
  next();
});


const Likemodel = mongoose.model<Like>("Like", likeSchema);

export default Likemodel;
