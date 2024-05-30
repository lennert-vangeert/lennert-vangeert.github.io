import { Document, ObjectId } from "mongoose";
import { Trip } from "../Trips/Trip.types";

export type Note = Document & {
  _id?: string;
  title: string;
  content: string;
  userId: ObjectId;
  tripId: ObjectId;
  trip?: Trip;
};
