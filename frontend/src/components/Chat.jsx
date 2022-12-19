import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  Spinner, Button, Form, InputGroup,
} from 'react-bootstrap';
import filter from 'leo-profanity';

import { useSocket, useAuth } from '../hooks/index.jsx';
import { actions } from '../slices/index.js';
import ChannelButton from './ChannelButton.jsx';

import routes from '../routes.js';

const Chat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const socket = useSocket();
  const auth = useAuth();
  const [text, setText] = useState('');
  const defaultChannelRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const authHeader = auth.getAuthHeader();

    const getData = async () => {
      try {
        const response = await axios.get(routes.api.usersPath(), {
          headers: authHeader,
        });

        dispatch(actions.setInitialState(response.data));
      } catch (error) {
        toast.error(t('components.chat.toast'));
        throw error;
      }
    };

    filter.loadDictionary('ru');

    getData();
  }, [dispatch, auth, t]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const channels = useSelector((state) => state.channelsInfo.channels);
  const messages = useSelector((state) => state.messagesInfo.messages);
  [defaultChannelRef.current] = channels;

  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const currentChannel = channels.find(({ id }) => currentChannelId === id)
   ?? defaultChannelRef.current;

  const currentChannelMessages = messages
    .filter(({ channelId }) => channelId === currentChannelId);

  const renderChannel = ({ id, name, removable }) => (
    <li
      key={id}
      className="nav-item w-100"
    >
      <ChannelButton
        handleChannelChange={() => dispatch(actions.setCurrentChannel({ channelId: id }))}
        channel={{
          id,
          name,
          removable,
          currentChannelId: currentChannel.id,
        }}
      />
    </li>
  );

  const renderMessage = ({ id, username, body }) => (
    <div
      className="text-break mb-2"
      key={id}
    >
      <b>{username}</b>
      {`: ${filter.clean(body)}`}
    </div>
  );

  return (
    channels.length === 0
      ? (
        <div className="h-100 row justify-content-center align-content-center">
          <Spinner variant="primary" animation="border" role="status">
            <span className="visually-hidden">{t('components.chat.spinner')}</span>
          </Spinner>
        </div>
      )
      : (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
              <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                <div style={{ textAlign: 'center' }}>{t('components.chat.header')}</div>
                <Button
                  variant="outline-light text-primary btn-group-vertical"
                  className="p-0"
                  onClick={() => dispatch(actions.openModal({ type: 'add' }))}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                  <span className="visually-hidden">
                    {t('components.chat.addChannelButton')}
                  </span>
                </Button>
              </div>
              <ul className="nav flex-column nav-pills nav-fill px-2">
                {channels.map(renderChannel)}
              </ul>
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0"><b>{`# ${currentChannel.name}`}</b></p>
                  <span className="text-muted">
                    {t('components.chat.messages.message', { count: currentChannelMessages.length })}
                  </span>
                </div>
                <div className="chat-messages overflow-auto px-5">
                  {currentChannelMessages.map(renderMessage)}
                </div>
                <div className="mt-auto px-5 py-3">
                  <Form
                    className="border rounded-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const userId = JSON.parse(localStorage.getItem('userId'));
                      const message = {
                        body: text,
                        username: userId.username,
                        channelId: currentChannelId,
                      };
                      socket.emit('newMessage', message, () => {
                        setText('');
                      });
                    }}
                  >
                    <InputGroup hasValidation={!text}>
                      <Form.Control
                        aria-label={t('components.chat.messageFormAriaLabel')}
                        ref={inputRef}
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        className="border-0 p-0 ps-2 form-control"
                        placeholder={t('components.chat.messageFormPlaceholder')}
                      />
                      <Button
                        disabled={!text}
                        type="submit"
                        variant="outline-light text-dark"
                        className="d-flex"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-up-square" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                        </svg>
                        <span className="visually-hidden">
                          {t('components.chat.confirmButton')}
                        </span>
                      </Button>
                    </InputGroup>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  );
};

export default Chat;
