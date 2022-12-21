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
import { io } from 'socket.io-client';
import 'react-toastify/dist/ReactToastify.css';

import ModalWindow from './components/Modals/Modal.jsx';

import AuthProvider from './providers/AuthProvider.jsx';
import ApiProvider from './providers/ApiProvider.jsx';
import store, { actions } from './slices/index.js';
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

  const socket = io();

  socket.on('newMessage', (message) => {
    console.log('Received message: ', message);
    store.dispatch(actions.addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    console.log('Received channel: ', channel);
    store.dispatch(actions.addChannel(channel));
  });

  socket.on('removeChannel', ({ id }) => {
    console.log('Removed channel: ', id);
    store.dispatch(actions.removeChannel({ channelId: id }));
  });

  socket.on('renameChannel', ({ id, name }) => {
    console.log('Renamed channel: ', { id, name });
    store.dispatch(actions.renameChannel({ id, name }));
  });

  const rootNode = ReactDOM.createRoot(document.getElementById('root'));
  rootNode.render(
    <RollbarProvider instance={rollbar}>
      <ErrorBoundary errorMessage="Rollbar error in my app">
        <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              <ApiProvider socket={socket}>
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
              </ApiProvider>
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>,
  );
};

export default init;
