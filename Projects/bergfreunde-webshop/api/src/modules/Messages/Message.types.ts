import { Document, ObjectId } from "mongoose";

export type Message = Document & {
  _id?: string;
  senderName: string;
  senderLastName: string;
  senderId: ObjectId;
  receiverId: ObjectId;
  message: string;
  productId: ObjectId;
  isRead: boolean;
};
