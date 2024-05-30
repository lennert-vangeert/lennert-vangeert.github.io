import { Document, ObjectId } from "mongoose";

export type Product = Document & {
  _id?: string;
  userId: ObjectId;
  name: string;
  description: string;
  brand: string;
  price: number;
  rating: number;
  images: string[];
  sizes: string[];
  colours: string[];
  sex: string;
  footschape: string;
  sole: string;
  category: string;
};
