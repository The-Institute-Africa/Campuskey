import API from '@/api/api'
import { jwtDecode } from "jwt-decode";

export const login = async ({ username, password }) => {
  try {
    const res = await API.post("/auth/public/signin", {
      username,
      password,
    });

    if (res.status !== 200 || !res.data.jwtToken) {
      return { success: false, message: "Login failed" };
    }

    const token = res.data.jwtToken;
    const decodedToken = jwtDecode(token);

    const userData = {
      username: decodedToken.sub,
      roles: Array.isArray(decodedToken.roles) ? decodedToken.roles : [],
      token,
    };

    // Persist auth data
    localStorage.setItem("JWT_TOKEN", token);
    localStorage.setItem("USER", JSON.stringify(userData));

    return {
      success: true,
      token,
      user: userData,
    };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, message: "Invalid credentials" };
  }
};


// --- DECODE TOKEN FUNCTION ---
export const getUserFromToken = (token) => {
  try {
    if (!token || typeof token !== "string") {
      console.error("Invalid token type:", token);
      return null;
    }

    const payload = jwtDecode(token);
    console.log("Decoded JWT payload:", payload);

    return {
      name: payload.name,
      email: payload.sub,
      role: payload.role,
    };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};





