import { API } from "@core/network/api";
import { Trip, TripBody } from "./trips.types";

const getTrips = () => {
  return API.get<Trip[]>("/trips");
};

const getTripById = (id: string) => {
  return API.get<Trip>(`/trips/${id}`);
};

const createTrip = (trip: TripBody) => {
  return API.post<Trip>("Trips", trip);
};

const updateTrip = (id: string, trip: TripBody) => {
  return API.patch<Trip>(`/trips/${id}`, trip);
};

const deleteTrip = (id: string) => {
  console.log(id);
  return API.delete<Trip>(`/trips/${id}`);
};

export { getTrips, getTripById, createTrip, updateTrip, deleteTrip };
