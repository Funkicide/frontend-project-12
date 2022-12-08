import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Rollbar from 'rollbar';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ModalWindow from './components/Modals/Modal.jsx';

import AuthProvider from './providers/AuthProvider.jsx';
import SocketProvider from './providers/SocketProvider.jsx';
import store from './slices/index.js';
import AppRoutes from './AppRoutes.jsx';
import ru from './locales/ru.js';

const rollbarConfig = {
  accessToken: 'b0e70c8e768e4312945bbdec3b535648',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const rollbar = new Rollbar(rollbarConfig);

const init = async () => {
  const defaultLanguage = 'ru';
  await i18next
    .use(initReactI18next)
    .init({
      lng: defaultLanguage,
      resources: {
        ru,
      },
    });

  const rootNode = ReactDOM.createRoot(document.getElementById('root'));
  rootNode.render(
    <RollbarProvider instance={rollbar}>
      <ErrorBoundary errorMessage="Rollbar error in my app">
        <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              <SocketProvider>
                <AppRoutes />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <ModalWindow />
              </SocketProvider>
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>,
  );
};

export default init;
