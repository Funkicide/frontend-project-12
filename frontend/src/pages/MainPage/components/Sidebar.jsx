import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ChannelButton from './ChannelButton';
import { actions } from '../../../slices';

const Sidebar = ({ channels, currentChannelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <div style={{ textAlign: 'center' }}>{t('components.chat.header')}</div>
        <Button
          variant="outline-light text-primary btn-group-vertical"
          className="p-0"
          onClick={() => dispatch(actions.openModal({ type: 'add' }))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">
            {t('components.chat.addChannelButton')}
          </span>
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map(({ id, name, removable }) => (
          <li key={id} className="nav-item w-100">
            <ChannelButton
              handleChannelChange={() =>
                dispatch(actions.setCurrentChannel({ channelId: id }))
              }
              channel={{
                id,
                name,
                removable,
              }}
              currentChannelId={currentChannelId}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
