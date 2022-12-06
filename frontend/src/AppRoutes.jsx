import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import Chat from './components/Chat.jsx';
import GuardedRoute from './components/GuardedRoute.jsx';
import Login from './components/routes/Login.jsx';
import SignUp from './components/routes/SighUp.jsx';
import App from './components/App';

const AppRoutes = () => (
  <Routes>
    <Route element={<App />}>
      <Route
        path={routes.pages.rootPath()}
        element={(
          <GuardedRoute>
            <Chat />
          </GuardedRoute>
          )}
      />
      <Route path={routes.pages.loginPath()} element={<Login />} />
      <Route path={routes.pages.signUpPath()} element={<SignUp />} />
    </Route>
  </Routes>
);

export default AppRoutes;
