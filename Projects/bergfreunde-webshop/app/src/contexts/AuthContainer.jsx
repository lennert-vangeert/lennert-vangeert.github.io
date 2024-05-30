import { createContext, useContext, useEffect, useState } from "react";

const key = "LOGGEDIN_USER";
const AuthContext = createContext();

const getUserFromStorage = () => {
  const user = localStorage.getItem(key);
  if (user) return JSON.parse(user);
  else return null;
};

const AuthContainer = ({ children }) => {
  const [user, setUser] = useState(getUserFromStorage());

  useEffect(() => {
    if (user) {
      fetch(`${import.meta.env.VITE_API_URL}/users/current`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!user._id) {
            setUser({ ...user, ...data });
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));

      localStorage.setItem(key, JSON.stringify(user));
      interval = setInterval(checkToken, 120000);
    } else {
      localStorage.clear();
      clearInterval(interval);
    }
  }, [user]);

  const checkToken = () => {
    if (localStorage.getItem("token")) {
      fetch("http://localhost:5000/users/current", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Unauthorized") {
            localStorage.removeItem("token");
            clearInterval(interval);
            setUser(null);
          }
        });
    }
  };
  let interval;

  const handleLogout = () => {
    setUser(null);
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  // delete password from user
  if (user) {
    delete user.password;
  }

  return (
    <AuthContext.Provider
      value={{ user: user, setUser, logout: handleLogout, login: handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContainer;
