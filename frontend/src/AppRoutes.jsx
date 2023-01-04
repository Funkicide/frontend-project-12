import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import Chat from './components/Chat.jsx';
import GuardedRoute from './components/GuardedRoute.jsx';
import Login from './components/pages/Login.jsx';
import SignUp from './components/pages/SighUp.jsx';
import ErrorPage from './components/pages/ErrorPage.jsx';
import App from './components/App';

const AppRoutes = () => (
  <Routes>
    <Route path={routes.pages.rootPath()} element={<App />}>
      <Route
        index
        element={
          <GuardedRoute>
            <Chat />
          </GuardedRoute>
        }
      />
      <Route path={routes.pages.loginPath()} element={<Login />} />
      <Route path={routes.pages.signUpPath()} element={<SignUp />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
