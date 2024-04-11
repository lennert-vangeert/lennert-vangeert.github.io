import { API } from "@core/network/api";
import qs from "query-string";
import { Activity, ActivityBody } from "./activities.types";

type Query = {
  tripId?: string;
};

const getActivities = (query: Query = {}) => {
  return API.get<Activity[]>(`/activities?${qs.stringify(query)}`);
};

const getActivityById = (id: string) => {
  return API.get<Activity>(`/activities/${id}`);
};

const createActivity = (activity: ActivityBody) => {
  console.log(activity);
  return API.post<Activity>("activities", activity);
};

const updateActivity = (activity: ActivityBody, id: string) => {
  return API.patch<Activity>(`/activities/${id}`, activity);
};

const deleteActivity = (id: string) => {
  console.log(`delete activity ${id}`);
  return API.delete<Activity>(`/activities/${id}`);
};

export { getActivities, getActivityById, createActivity, updateActivity, deleteActivity };
