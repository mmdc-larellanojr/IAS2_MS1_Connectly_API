
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return accessToken ? { access: accessToken, refresh: refreshToken } : null;
  });

  useEffect(() => {
    if (tokens?.access) {
      try {
        const decoded = jwtDecode(tokens.access);
        setUser({ id: decoded.user_id, username: decoded.username, role: decoded.role });
        localStorage.setItem('accessToken', tokens.access);
        if (tokens.refresh) {
          localStorage.setItem('refreshToken', tokens.refresh);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
        setTokens(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
  }, [tokens]);

  const login = (newTokens, userData) => {
    setTokens(newTokens);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
