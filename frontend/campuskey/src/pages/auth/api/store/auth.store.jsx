import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { login as apiLogin } from "../auth.api"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("JWT_TOKEN");
  const decoded = storedToken ? jwtDecode(storedToken) : null;

  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState(
    decoded
      ? {
          username: decoded.sub,
          roles: Array.isArray(decoded.roles) ? decoded.roles : [],
        }
      : null
  );

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
