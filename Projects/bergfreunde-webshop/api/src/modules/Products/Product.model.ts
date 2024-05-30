import mongoose from "mongoose";
import validateModel from "../../validation/validateModel";
import { Product } from "./Product.types";
import Likemodel from "../Likes/Like.model";
import messageModel from "../Messages/Message.model";

const productSchema = new mongoose.Schema<Product>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      enum: ["La Sportiva", "Scarpa", "Red Chili", "unParallel", "Boreal"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    sizes: {
      type: [String],
      enum: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
      required: true,
    },
    colours: {
      type: [String],
      enum: ["Rood", "Blauw", "Geel", "Groen", "Zwart", "Wit"],
      required: true,
    },
    sex: {
      type: String,
      enum: ["Mannen", "Vrouwen", "Unisex"],
      required: true,
    },
    footschape: {
      type: String,
      enum: ["Egyptisch", "Grieks", "Romeins"],
      required: true,
    },
    sole: {
      type: String,
      enum: ["Vibram XS", "Vibram CS", "Trax", "Andere"],
      required: true,
    },
    category: {
      type: String,
      enum: ["Klittenband", "Veters", "Slip-on"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//date format
// YYYY-MM-DD

productSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

productSchema.pre(
  "deleteOne",
  { document: true, query: false },
  function (next) {
    Likemodel.deleteMany({ productId: this._id }).exec();
    messageModel.deleteMany({ productId: this._id }).exec();
    next();
  }
);

productSchema.pre(["findOneAndDelete", "deleteMany"], function (next) {
  const id = this.getFilter()["_id"];
  Likemodel.deleteMany({ productId: id }).exec();
  messageModel.deleteMany({ productId: id }).exec();
  next();
});

const Productmodel = mongoose.model<Product>("Product", productSchema);

export default Productmodel;
