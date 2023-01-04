import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider.jsx';
import routes from '../routes';

const GuardedRoute = ({ children }) => {
  const auth = useAuth();

  return auth.isLoggedIn ? (
    children
  ) : (
    <Navigate to={routes.pages.loginPath()} />
  );
};

export default GuardedRoute;
