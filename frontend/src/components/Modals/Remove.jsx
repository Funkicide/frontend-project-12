import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { actions } from '../../slices';
import { useChat } from '../../hooks';

const Remove = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
        <Modal.Title>{t('modals.remove.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('modals.remove.body')}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(actions.closeModal())} variant="secondary">{t('modals.remove.cancelButton')}</Button>
        <Button onClick={handleDeletion} variant="danger">{t('modals.remove.confirmButton')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
