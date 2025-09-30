import React, { createContext, useState, useEffect } from 'react'; // <-- FIX: useState added here

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // FIX: useState is now correctly imported and used
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user/token from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    // FIX for "undefined is not a valid json": Robust checks added
    const isValidUser = storedUser && storedUser !== 'undefined' && storedUser !== '';
    const isValidToken = storedToken && storedToken !== 'undefined' && storedToken !== '';

    if (isValidUser && isValidToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (e) {
        console.error("Error parsing stored user data:", e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []); // Empty dependency array means it runs once on mount

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};