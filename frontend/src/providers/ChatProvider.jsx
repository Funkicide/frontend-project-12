import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { ChatContext } from '../contexts/index.jsx';

import { actions } from '../slices/index.js';

const ChatProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

  const postNewMessage = (message) => {
    console.log('Emiting: ', message);
    socket.emit('newMessage', message, (response) => {
      console.log(response);
    });
  };

  const postNewChannel = (channel) => {
    console.log('Emiting: ', channel);
    socket.emit('newChannel', channel, (response) => {
      console.log(response);
      dispatch(actions.setCurrentChannel({ channelId: response.data.id }));
    });
  };

  const removeChannel = ({ id }) => {
    console.log('Emiting: ', id);
    socket.emit('removeChannel', { id }, (response) => {
      console.log(response);
    });
  };

  const renameChannel = ({ id, name }) => {
    console.log('Emiting: ', id, name);
    socket.emit('renameChannel', { id, name }, (response) => {
      console.log(response);
    });
  };

  socket.on('newMessage', (message) => {
    console.log('Received message: ', message);
    dispatch(actions.addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    console.log('Received channel: ', channel);
    dispatch(actions.addChannel(channel));
  });

  socket.on('removeChannel', ({ id }) => {
    console.log('Removed channel: ', id);
    dispatch(actions.removeChannel({ channelId: id }));
    // dispatch(actions.setCurrentChannel({ channelId: 1 }));
  });

  socket.on('renameChannel', ({ id, name }) => {
    console.log('Renamed channel: ', { id, name });
    dispatch(actions.renameChannel({ id, name }));
  });

  const value = useMemo(
    () => ({
      postNewMessage, postNewChannel, removeChannel, renameChannel,
    }),
    [postNewMessage, postNewChannel, removeChannel, renameChannel],
  );

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
