import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Root from './components/routes/Root.jsx';
import ErrorPage from './components/routes/ErrorPage.jsx';
import Login from './components/routes/Login.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import ChatProvider from './providers/ChatProvider.jsx';
import store from './slices/index.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <ChatProvider>
        <RouterProvider router={router} />
      </ChatProvider>
    </AuthProvider>
  </Provider>,
);
