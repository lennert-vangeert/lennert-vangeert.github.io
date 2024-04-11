export type Trip = {
  _id: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
};

export type TripBody = Omit<Trip, "_id">;
