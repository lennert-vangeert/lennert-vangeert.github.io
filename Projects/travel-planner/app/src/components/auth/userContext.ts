import { User } from "@core/modules/auth/auth.types";
import { createContext } from "@lit/context";

const userContext = createContext<User | null>("user");

export default userContext;