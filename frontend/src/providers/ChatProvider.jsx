import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { ChatContext } from '../contexts/index.jsx';

import { actions } from '../slices/index.js';

const ChatProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

  const emitNewMessage = (message) => {
    console.log('Emiting: ', message);
    socket.emit('newMessage', message, (response) => {
      console.log(response);
    });
  };

  socket.on('newMessage', (message) => {
    console.log('Received message: ', message);
    dispatch(actions.addMessage(message));
  });

  const value = useMemo(() => ({ emitNewMessage }), [emitNewMessage]);

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
