import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import GuardedRoute from './common-components/GuardedRoute.jsx';
import Chat from './pages/MainPage/Chat.jsx';
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import App from './common-components/App';

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
      <Route path={routes.pages.loginPath()} element={<SignInPage />} />
      <Route path={routes.pages.signUpPath()} element={<SignUpPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
