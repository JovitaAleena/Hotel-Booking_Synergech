import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const normalizeEmail = (email) => email.trim().toLowerCase();

  const isRegistered = (email) => {
    const registeredEmails = JSON.parse(localStorage.getItem('registeredEmails') || '[]');
    return registeredEmails.includes(normalizeEmail(email));
  };

  const register = (email) => {
    const normalizedEmail = normalizeEmail(email);
    const registeredEmails = JSON.parse(localStorage.getItem('registeredEmails') || '[]');
    if (!registeredEmails.includes(normalizedEmail)) {
      localStorage.setItem(
        'registeredEmails',
        JSON.stringify([...registeredEmails, normalizedEmail])
      );
    }
  };

  const login = (userData) => {
    if (!isRegistered(userData.email)) return false;

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    // Sync user state with localStorage if needed
    const stored = localStorage.getItem('user');
    if (!user && stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isRegistered }}>
      {children}
    </AuthContext.Provider>
  );
};
