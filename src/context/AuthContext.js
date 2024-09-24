"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = Cookies.get('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const contextToken = (newToken) => {
    setToken(newToken);
    Cookies.set('token', newToken)
  };

  const removeToken = () => {
    setToken(null);
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ token, contextToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
