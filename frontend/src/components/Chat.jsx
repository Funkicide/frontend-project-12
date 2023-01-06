import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAuth } from '../providers/AuthProvider.jsx';
import MessageBox from './MessageBox.jsx';

import { channelsSelectors, fetchData } from '../slices/channelsSlice.js';
import { messagesSelector } from '../slices/messagesSlice.js';
import Sidebar from './Sidebar.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

const Chat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useAuth();
  const defaultChannelRef = useRef(null);

  useEffect(() => {
    const authHeader = auth.getAuthHeader();
    dispatch(fetchData(authHeader));
  }, [dispatch, auth]);

  const loadingStatus = useSelector(channelsSelectors.loadingStatus);
  const channels = useSelector(channelsSelectors.channels);
  const messages = useSelector(messagesSelector);
  [defaultChannelRef.current] = channels;

  const currentChannelId = useSelector(channelsSelectors.currentChannelId);
  const currentChannel =
    channels.find(({ id }) => currentChannelId === id) ??
    defaultChannelRef.current;

  const currentChannelMessages = messages.filter(
    ({ channelId }) => channelId === currentChannelId
  );

  if (loadingStatus === 'loading') {
    return <LoadingSpinner />;
  }

  if (loadingStatus === 'failed') {
    toast.error(t('components.chat.toast'));
    return <LoadingSpinner />;
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Sidebar channels={channels} currentChannelId={currentChannel?.id} />
        <MessageBox
          currentChannelName={currentChannel?.name}
          currentChannelMessages={currentChannelMessages}
        />
      </div>
    </div>
  );
};

export default Chat;
