import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ModalWindow from './components/Modals/Modal.jsx';

import AuthProvider from './providers/AuthProvider.jsx';
import ChatProvider from './providers/ChatProvider.jsx';
import store from './slices/index.js';
import AppRoutes from './AppRoutes.jsx';
import ru from './locales/ru.js';

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
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <ChatProvider>
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
          </ChatProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>,
  );
};

export default init;
