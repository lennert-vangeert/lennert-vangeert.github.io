import mongoose from "mongoose";
import { Order } from "./Order.types";
import validateModel from "../../validation/validateModel";

const orderSchema = new mongoose.Schema<Order>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        colour: {
          type: String,
          enum: ["Rood", "Blauw", "Geel", "Groen", "Zwart", "Wit"],
          required: true,
        },
        size: {
          type: String,
          enum: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

const orderModel = mongoose.model<Order>("Order", orderSchema);

export default orderModel;
