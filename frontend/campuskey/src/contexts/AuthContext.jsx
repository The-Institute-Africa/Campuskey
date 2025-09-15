import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserFromToken, login as apiLogin } from "@/api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // On app load, check for saved token
  useEffect(() => {
    const savedToken = localStorage.getItem("jwt");
    if (savedToken) {
      setToken(savedToken);
      setUser(getUserFromToken(savedToken));
    }
  }, []);

  // Login function
  const login = async ({ email, password }) => {
    try {
      const data = await apiLogin(email, password);
      const jwt = data.token;

      localStorage.setItem("jwt", jwt);
      setToken(jwt);
      setUser(getUserFromToken(jwt));

      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
