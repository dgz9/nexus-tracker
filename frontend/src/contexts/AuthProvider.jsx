import { useState, useEffect } from 'react';
import axios from 'axios';
import { addToast } from '@heroui/react';
import { AuthContext } from './AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      
      addToast({ title: "Success", description: "Logged in successfully!", color: "success", timeout: 5000 });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed';
      addToast({ title: "Error", description: message, color: "danger", timeout: 5000 });
      return { success: false, error: message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('/auth/register', { name, email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      
      addToast({ title: "Success", description: "Account created successfully!", color: "success", timeout: 5000 });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Registration failed';
      addToast({ title: "Error", description: message, color: "danger", timeout: 5000 });
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    addToast({ title: "Success", description: "Logged out successfully", color: "success", timeout: 5000 });
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}