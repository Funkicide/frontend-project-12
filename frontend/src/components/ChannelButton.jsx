import React from 'react';
import { ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { useDispatch } from 'react-redux';
import { actions } from '../slices';

const ChannelButton = ({
  channel: { id, name, removable, currentChannelId },
  handleChannelChange,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const buttonClassNames = cn(
    'w-100',
    'rounded-0',
    'text-start',
    'text-truncate'
  );
  const toggleClassNames = cn('rounded-0', 'flex-grow-0', 'btn');

  if (!removable) {
    return (
      <Button
        className={buttonClassNames}
        variant={id === currentChannelId ? 'secondary' : null}
        onClick={handleChannelChange}
      >
        {`# ${name}`}
      </Button>
    );
  }
  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        onClick={handleChannelChange}
        className={buttonClassNames}
        variant={id === currentChannelId ? 'secondary' : null}
      >
        {`# ${name}`}
      </Button>

      <Dropdown.Toggle
        split
        variant={id === currentChannelId ? 'secondary' : null}
        childBsPrefix={toggleClassNames}
      >
        <span className="visually-hidden">
          {t('components.channelButton.dropdownToggleLabel')}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() =>
            dispatch(actions.openModal({ type: 'rename', item: { id, name } }))
          }
          eventKey="1"
        >
          {t('components.channelButton.renameButton')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() =>
            dispatch(actions.openModal({ type: 'remove', item: id }))
          }
          eventKey="2"
        >
          {t('components.channelButton.deleteButton')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelButton;
