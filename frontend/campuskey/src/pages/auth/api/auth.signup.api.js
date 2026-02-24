// api/auth.js
import API from '@/api/api';

export const AuthSignup = async ({ username, email, password, role }) => {
  try {
    const response = await API.post("/auth/public/signup", {
      username,
      email,
      password,
      role: [role], 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};
