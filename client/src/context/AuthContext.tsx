import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router";
import api, { setAuth, clearAuth } from "../utils/api.js";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const maybeUser = localStorage.getItem("user");

    if (maybeUser) {
      return JSON.parse(maybeUser);
    }
  });

  const login = async (username, password) => {
    setAuth(username, password);
    const response = await api.get("/auth/me");
    const userData = response.data;

    const user = {
      username,
      password,
      roles: userData.roles,
    };

    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    navigate("/");
  };

  const registerUser = async (username, password) => {
    await api.post("/auth/register", { username, password });
    navigate("/login");
  };

  const logout = () => {
    setUser(null);
    clearAuth();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
