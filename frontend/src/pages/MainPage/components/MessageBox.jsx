import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { animateScroll } from 'react-scroll';
import MessageInputForm from './MessageInputForm.jsx';

const MessageBox = ({ currentChannelName, currentChannelMessages }) => {
  const { t } = useTranslation();

  useEffect(() => {
    filter.loadDictionary('ru');
  }, []);

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messageBox',
      duration: 0,
    });
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">
            {t('components.chat.messages.message', {
              count: currentChannelMessages.length,
            })}
          </span>
        </div>
        <div id="messageBox" className="chat-messages overflow-auto px-5">
          {currentChannelMessages.map(({ id, username, body }) => (
            <div className="text-break mb-2" key={id}>
              <b>{username}</b>
              {`: ${filter.clean(body)}`}
            </div>
          ))}
        </div>
        <MessageInputForm />
      </div>
    </div>
  );
};

export default MessageBox;
