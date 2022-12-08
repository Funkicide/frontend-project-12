import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { actions } from '../../slices';
import { useSocket } from '../../hooks';

const Rename = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { id, name: previousName } = useSelector((state) => state.modal.item);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelNames = channels.map((channel) => channel.name);
  const socket = useSocket();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      currentName: previousName,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: yup.object().shape({
      currentName: yup.string()
        .min(3, t('modals.validation.channelNameLength'))
        .max(20, t('modals.validation.channelNameLength'))
        .notOneOf(channelNames, t('modals.validation.notUnique'))
        .required(t('modals.validation.requiredField')),
    }),
    onSubmit: ({ currentName }) => {
      socket.emit('renameChannel', { id, name: currentName }, () => {
        dispatch(actions.closeModal());
        toast.success(t('modals.rename.toast'));
      });
    },
  });

  return (
    <Modal
      show
      centered
      onHide={() => dispatch(actions.closeModal())}
      animation
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className="position-relative">
            <Form.Control
              disabled={formik.isSubmitting}
              isInvalid={formik.errors.currentName}
              ref={inputRef}
              name="currentName"
              onChange={formik.handleChange}
              value={formik.values.currentName}
            />
            <Form.Control.Feedback tooltip type="invalid">{formik.errors.currentName}</Form.Control.Feedback>
          </Form.Group>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(actions.closeModal())} variant="secondary">{t('modals.rename.cancelButton')}</Button>
        <Button
          disabled={formik.isSubmitting}
          onClick={formik.handleSubmit}
          type="submit"
          variant="primary"
        >
          {formik.isSubmitting ? t('modals.rename.loadingStatus') : t('modals.rename.confirmButton')}

        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;
