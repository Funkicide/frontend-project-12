import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useApi } from '../providers/ApiProvider.jsx';
import { channelsSelectors } from '../slices/channelsSlice.js';

const MessageInputForm = () => {
  const { t } = useTranslation();
  const api = useApi();
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const currentChannelId = useSelector(channelsSelectors.currentChannelId);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        className="py-1 border rounded-2"
        onSubmit={(e) => {
          e.preventDefault();
          const userId = JSON.parse(localStorage.getItem('userId'));
          const message = {
            body: text,
            username: userId.username,
            channelId: currentChannelId,
          };
          api.addNewMessage(message, () => setText(''));
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-up-square"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
              />
            </svg>
            <span className="visually-hidden">
              {t('components.chat.confirmButton')}
            </span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageInputForm;
