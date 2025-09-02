import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session in localStorage
    try {
      const savedUser = localStorage.getItem('campus_key_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('campus_key_user');
    }
    setLoading(false);
  }, []);

  const signup = (userData) => {
    // In a real app, this would be an API call. For now, we use localStorage.
    const users = JSON.parse(localStorage.getItem('campus_key_users') || '[]');
    const existingUser = users.find(u => u.email === userData.email);

    if (existingUser) {
      return { success: false, message: 'User with this email already exists.' };
    }

    users.push(userData);
    localStorage.setItem('campus_key_users', JSON.stringify(users));
    
    // Automatically log in the user after signup
    login(userData);
    
    return { success: true };
  };

  const login = (credentials) => {
     // This is a mock login, allows any landlord/admin login but checks students
    if (credentials.role && credentials.role !== 'student') {
        setUser(credentials);
        localStorage.setItem('campus_key_user', JSON.stringify(credentials));
        return { success: true };
    }

    if (credentials.isGoogle) {
      setUser(credentials);
      localStorage.setItem('campus_key_user', JSON.stringify(credentials));
      return { success: true };
    }

    const users = JSON.parse(localStorage.getItem('campus_key_users') || '[]');
    const foundUser = users.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('campus_key_user', JSON.stringify(foundUser));
        return { success: true };
    }

    return { success: false, message: 'Invalid email or password.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campus_key_user');
  };

  const value = {
    user,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};