import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { actions } from '../../slices';
import { useApi } from '../../providers/ApiProvider.jsx';
import { modalSelectors } from '../../slices/modalSlice';

const Remove = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const id = useSelector(modalSelectors.item);
  const [isSubmitting, setSubmitting] = useState(false);
  const api = useApi();

  const handleDeletion = () => {
    setSubmitting(true);
    api.removeChannel(id);
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
        <Button
          onClick={() => dispatch(actions.closeModal())}
          variant="secondary"
        >
          {t('modals.remove.cancelButton')}
        </Button>
        <Button
          disabled={isSubmitting}
          onClick={handleDeletion}
          variant="danger"
        >
          {isSubmitting
            ? t('modals.remove.loadingStatus')
            : t('modals.remove.confirmButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
