import { Document, ObjectId } from "mongoose";

export type Order = Document & {
  _id?: string;
  userId: ObjectId;
  products: {
    productId: ObjectId;
    quantity: number;
    colour: string;
    size: string;
  }[];
  total: number;
  address: {
    street: string;
    city: string;
    zip: string;
  };
};
