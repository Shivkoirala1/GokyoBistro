import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

// Generates (once) and persists a guestId in this browser, so a guest's
// orders can be looked up later without ever creating a User account.
const getOrCreateGuestId = () => {
  let id = localStorage.getItem("guestId");
  if (!id) {
    id = "guest_" + crypto.randomUUID();
    localStorage.setItem("guestId", id);
  }
  return id;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [guestId] = useState(getOrCreateGuestId);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const register = async ({ name, email, password, phone }) => {
    const { data } = await api.post("/auth/register", { name, email, password, phone });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data.user;
  };

  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, guestId, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
