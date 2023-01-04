import React, { useMemo, createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { actions } from '../slices/index.js';

const ApiContext = createContext({});

const useApi = () => useContext(ApiContext);

const ApiProvider = ({ children, socket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const value = useMemo(() => {
    const addNewMessage = (message, callback) => {
      socket.emit('newMessage', message, callback);
    };

    const addNewChannel = (channelName) => {
      socket.emit('newChannel', { name: channelName }, ({ data }) => {
        dispatch(actions.setCurrentChannel({ channelId: data.id }));
        dispatch(actions.closeModal());
        toast.success(t('modals.add.toast'));
      });
    };

    const removeChannel = (id) => {
      socket.emit('removeChannel', { id }, () => {
        dispatch(actions.closeModal());
        toast.success(t('modals.remove.toast'));
      });
    };

    const renameChannel = (id, currentName) => {
      socket.emit('renameChannel', { id, name: currentName }, () => {
        dispatch(actions.closeModal());
        toast.success(t('modals.rename.toast'));
      });
    };

    return {
      addNewMessage,
      addNewChannel,
      removeChannel,
      renameChannel,
    };
  }, [dispatch, socket, t]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export default ApiProvider;

export { useApi };
