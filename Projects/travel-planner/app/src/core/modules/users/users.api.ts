import { API } from "@core/network/api";
import { User, UserWithoutPassword } from "./users.types";

const getCurrentUser = () => {
  return API.get<User[]>("/users/current");
};

const updateUser = (user: UserWithoutPassword) => { 
  console.log(user);
  return API.patch<UserWithoutPassword>("/users/edit", user);
}

export {getCurrentUser, updateUser};
