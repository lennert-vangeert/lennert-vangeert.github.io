import { Document, ObjectId } from "mongoose";

export type Like = Document & {
  _id?: string;
  userId: ObjectId;
  productId: ObjectId;
};
