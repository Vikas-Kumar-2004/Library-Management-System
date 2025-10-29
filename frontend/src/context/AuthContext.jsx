import React, { createContext, useContext, useState } from 'react';
import axios from "../components/services/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Login function: calls backend and saves token + user
  const login = async (username, password) => {
    try {
      const res = await axios.post('/auth/login', { username, password });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return { success: true, user: res.data.user };
      } else {
        return { success: false, message: res.data.message || 'Login failed' };
      }
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || 'Server error during login',
      };
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAdmin = user?.isAdmin || false;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
