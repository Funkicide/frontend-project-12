import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { actions } from '../../slices';
import { useSocket } from '../../hooks';

const Remove = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const id = useSelector((state) => state.modal.item);
  const [isSubmitting, setSubmitting] = useState(false);
  const socket = useSocket();

  const handleDeletion = () => {
    setSubmitting(true);
    socket.emit('removeChannel', { id }, () => {
      dispatch(actions.closeModal());
      toast.success(t('modals.remove.toast'));
    });
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
        <Button
          disabled={isSubmitting}
          onClick={handleDeletion}
          variant="danger"
        >
          {isSubmitting ? t('modals.remove.loadingStatus') : t('modals.remove.confirmButton')}

        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
