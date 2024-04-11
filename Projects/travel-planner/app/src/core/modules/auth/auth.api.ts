import { API } from "@core/network/api";
import { Auth, User } from "./auth.types";

type LoginBody = {
  email: string;
  password: string;
};

type RegisterBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const login = (body: LoginBody) => {
  return API.post<Auth>("/login", body);
};

export const register = (body: RegisterBody) => {
  return API.post<Auth>("/register", body);
}

export const getCurrentUser = () => {
  return API.get<User>("/users/current");
};
