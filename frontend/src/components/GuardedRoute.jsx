import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import routes from '../routes';

const GuardedRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to={routes.pages.loginPath()} />
  );
};

export default GuardedRoute;
