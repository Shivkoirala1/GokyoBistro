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
  // Captured once when a guest chooses "Continue as Guest" - reused to
  // prefill checkout so they don't have to retype it.
  const [guestInfo, setGuestInfoState] = useState(() => {
    const stored = localStorage.getItem("guestInfo");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const setGuestInfo = (info) => {
    localStorage.setItem("guestInfo", JSON.stringify(info));
    setGuestInfoState(info);
  };

  // Register no longer logs the user in immediately - the account starts
  // unverified and needs the emailed code first (see verifyEmail below).
  const register = async ({ name, email, password, phone, address }) => {
    const { data } = await api.post("/auth/register", { name, email, password, phone, address });
    return data; // { message, email }
  };

  const verifyEmail = async ({ email, code }) => {
    const { data } = await api.post("/auth/verify-email", { email, code });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data.user;
  };

  const resendVerification = async (email) => {
    const { data } = await api.post("/auth/resend-verification", { email });
    return data;
  };

  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data.user;
  };

  const forgotPassword = async (email) => {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
  };

  const resetPassword = async ({ email, code, newPassword }) => {
    const { data } = await api.post("/auth/reset-password", { email, code, newPassword });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        guestId,
        guestInfo,
        setGuestInfo,
        register,
        verifyEmail,
        resendVerification,
        login,
        forgotPassword,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
