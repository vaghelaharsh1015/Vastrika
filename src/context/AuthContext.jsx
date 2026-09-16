import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('vastrika_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('vastrika_token') || null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [isLoading, setIsLoading] = useState(false);

  // Sync token & user to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('vastrika_token', token);
    } else {
      localStorage.removeItem('vastrika_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('vastrika_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vastrika_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await api.login({ email, password });
      if (res.success && res.data) {
        setUser(res.data);
        setToken(res.data.token);
        setIsAuthModalOpen(false);
        return { success: true, user: res.data };
      } else {
        return { success: false, message: res.message || 'Login failed' };
      }
    } catch (err) {
      return { success: false, message: err.message || 'Network error connecting to backend' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password, phone) => {
    setIsLoading(true);
    try {
      const res = await api.register({ name, email, password, phone });
      if (res.success && res.data) {
        setUser(res.data);
        setToken(res.data.token);
        setIsAuthModalOpen(false);
        return { success: true, user: res.data };
      } else {
        return { success: false, message: res.message || 'Registration failed' };
      }
    } catch (err) {
      return { success: false, message: err.message || 'Network error connecting to backend' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('vastrika_user');
    localStorage.removeItem('vastrika_token');
  };

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isLoading,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openLogin,
        openRegister,
        closeAuthModal,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
