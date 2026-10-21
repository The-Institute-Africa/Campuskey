import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { login as apiLogin } from "../auth.api"

const AuthContext = createContext();

const readStoredAuth = () => {
  const storedToken = localStorage.getItem("JWT_TOKEN");
  if (!storedToken) return { token: null, user: null };

  try {
    const decoded = jwtDecode(storedToken);
    if (!decoded.sub || (decoded.exp && decoded.exp * 1000 <= Date.now())) {
      throw new Error("Stored session is invalid or expired");
    }
    return {
      token: storedToken,
      user: {
        username: decoded.sub,
        roles: Array.isArray(decoded.roles) ? decoded.roles : [],
      },
    };
  } catch {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    return { token: null, user: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [initialAuth] = useState(readStoredAuth);
  const [token, setToken] = useState(initialAuth.token);
  const [user, setUser] = useState(initialAuth.user);

 const login = async ({ username, password }) => {
  const result = await apiLogin({ username, password });

  if (!result.success) return result;

  const { token } = result;
  const decoded = jwtDecode(token);

  const userData = {
    username: decoded.sub,
    roles: Array.isArray(decoded.roles) ? decoded.roles : [],
  };

  localStorage.setItem("JWT_TOKEN", token);

  setToken(token);
  setUser(userData);

  return {
    success: true,
    user: userData,
  };
};


  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user,  setUser,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
