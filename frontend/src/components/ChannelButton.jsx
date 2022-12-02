import {
  ButtonGroup, Button, DropdownButton, Dropdown,
} from 'react-bootstrap';

import cn from 'classnames';

import { useDispatch } from 'react-redux';
import { actions } from '../slices';

const ChannelButton = ({
  channel: {
    id, name, removable, currentChannelId,
  }, handleChannelChange,
}) => {
  const dispatch = useDispatch();
  const buttonClassNames = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn');

  if (!removable) {
    return (
      <Button
        className={buttonClassNames}
        variant={id === currentChannelId ? 'secondary' : null}
        onClick={handleChannelChange}
      >
        {'# '}
        {name}
      </Button>
    );
  }
  return (
    <ButtonGroup className="d-flex">
      <Button
        onClick={handleChannelChange}
        className={buttonClassNames}
        variant={id === currentChannelId ? 'secondary' : null}
      >
        {'# '}
        {name}
      </Button>

      <DropdownButton
        bsPrefix={buttonClassNames}
        variant={id === currentChannelId ? 'secondary' : null}
        title=""
        as={ButtonGroup}
        id="bg-nested-dropdown"
      >
        <Dropdown.Item onClick={() => dispatch(actions.openModal({ type: 'rename', item: { id, name } }))} eventKey="1">Переименовать</Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(actions.openModal({ type: 'remove', item: id }))} eventKey="2">Удалить</Dropdown.Item>
      </DropdownButton>
    </ButtonGroup>
  );
};

export default ChannelButton;
