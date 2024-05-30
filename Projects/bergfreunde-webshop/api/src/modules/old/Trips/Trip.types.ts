import { Document, ObjectId } from "mongoose";

export type Trip = Document & {
  _id?: string;
  userId: ObjectId;
  country: string;
  city: string;
  startDate: Date;
  endDate: Date;
};
