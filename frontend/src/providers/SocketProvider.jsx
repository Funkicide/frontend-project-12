import React from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { SocketContext } from '../contexts/index.jsx';

import { actions } from '../slices/index.js';

const SocketProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

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
  });

  socket.on('renameChannel', ({ id, name }) => {
    console.log('Renamed channel: ', { id, name });
    dispatch(actions.renameChannel({ id, name }));
  });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
