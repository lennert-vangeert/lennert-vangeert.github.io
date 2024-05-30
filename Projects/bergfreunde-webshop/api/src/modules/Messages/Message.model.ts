import mongoose from "mongoose";
import validateModel from "../../validation/validateModel";
import { Message } from "./Message.types";

const messageSchema = new mongoose.Schema<Message>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderLastName: {
      type: String,
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


messageSchema.pre("save", function (next) {
  validateModel(this);
  next();
});


const messageModel = mongoose.model<Message>("Message", messageSchema);

export default messageModel;