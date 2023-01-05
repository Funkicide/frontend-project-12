import React, { createContext, useContext, useState, useMemo } from 'react';

const AuthContext = createContext({});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [isLoggedIn, setLoggedIn] = useState(userId);

  const logIn = () => setLoggedIn(JSON.parse(localStorage.getItem('userId')));
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(null);
  };

  const value = useMemo(() => {
    const getAuthHeader = () => {
      if (userId && userId.token) {
        return { Authorization: `Bearer ${userId.token}` };
      }

      return {};
    };

    return {
      isLoggedIn,
      logIn,
      logOut,
      getAuthHeader,
    };
  }, [isLoggedIn, userId]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export { useAuth };
