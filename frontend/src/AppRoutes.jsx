import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import Chat from './components/Chat.jsx';
import GuardedRoute from './components/GuardedRoute.jsx';
import Login from './components/routes/Login.jsx';
import Root from './components/routes/Root.jsx';

const AppRoutes = () => (
  <Routes>
    <Route element={<Root />}>
      <Route
        path={routes.pages.rootPath()}
        element={(
          <GuardedRoute>
            <Chat />
          </GuardedRoute>
          )}
      />
      <Route path={routes.pages.loginPath()} element={<Login />} />
    </Route>
  </Routes>
);

export default AppRoutes;
