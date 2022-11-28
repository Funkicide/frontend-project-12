import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { useChat } from '../hooks/index.jsx';
import { actions } from '../slices/index.js';

const Chat = () => {
  const dispatch = useDispatch();
  const chatApi = useChat();
  const [text, setText] = useState('');

  const channels = useSelector((state) => state.channelsInfo.channels);
  const messages = useSelector((state) => state.messagesInfo.messages);

  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const currentChannel = channels.find(({ id }) => currentChannelId === id);
  const currentChannelMessages = messages
    .filter(({ channelId }) => channelId === currentChannelId);

  const renderChannel = (channel) => {
    const buttonClassNames = cn('w-100', 'rounded-0', 'text-start', 'btn', {
      'btn-secondary': channel.id === currentChannelId,
    });

    return (
      <li
        key={channel.id}
        className="nav-item w-100"
      >
        <button
          type="button"
          className={buttonClassNames}
          onClick={() => dispatch(actions.setCurrentChannel({ channelId: channel.id }))}
        >
          {'# '}
          {channel.name}
        </button>
      </li>
    );
  };

  const renderMessage = (message) => (
    <div
      className="text-break mb-2"
      key={message.id}
    >
      <b>{message.username}</b>
      {': '}
      {message.body}
    </div>
  );

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {channels.map(renderChannel)}
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0"><b>{currentChannel && currentChannel.name}</b></p>
              <span className="text-muted">
                {currentChannelMessages && currentChannelMessages.length}
                {' '}
                messages
              </span>
            </div>
            <div className="chat-messages overflow-auto px-5">
              {currentChannelMessages.map(renderMessage)}
            </div>
            <div className="mt-auto px-5 py-3">
              <form
                className="py-1 border rounded-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const userId = JSON.parse(localStorage.getItem('userId'));
                  chatApi.emitNewMessage({
                    body: text,
                    username: userId.username,
                    channelId: currentChannelId,
                  });
                  setText('');
                }}
              >
                <input onChange={(e) => setText(e.target.value)} value={text} className="border-0 p-0 ps-2 form-control" />
                <button type="submit" className="btn btn-group-vertical btn-primary">Отправить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
