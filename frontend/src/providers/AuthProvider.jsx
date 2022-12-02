import React, { useState, useMemo } from 'react';

import { AuthContext } from '../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(userId);

  const getAuthHeader = () => {
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };

  const logIn = () => setLoggedIn(JSON.parse(localStorage.getItem('userId')));
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(null);
  };

  const value = useMemo(() => ({
    loggedIn, logIn, logOut, getAuthHeader,
  }), [loggedIn, getAuthHeader]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
