import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../slices';
import { useChat } from '../../hooks';

const Remove = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.modal.item);
  const chatApi = useChat();

  const handleDeletion = () => {
    chatApi.removeChannel({ id });
    dispatch(actions.closeModal());
  };

  return (
    <Modal
      show
      centered
      onHide={() => dispatch(actions.closeModal())}
      animation
    >
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Уверены?</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(actions.closeModal())} variant="secondary">Отмена</Button>
        <Button onClick={handleDeletion} variant="danger">Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
