import { createContext, useState, useEffect } from "react";
import { login, register, verifyCode } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state directly
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // Sync state if localStorage changes from another tab
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const loginUser = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const registerUser = async (data) => await register(data);
  const verifyUser = async (data) => await verifyCode(data);

  return (
    <AuthContext.Provider value={{ token, loginUser, logoutUser, user, setUser, registerUser, verifyUser }}>
      {children}
    </AuthContext.Provider>
  );
};