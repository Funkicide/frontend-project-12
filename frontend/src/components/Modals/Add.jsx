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
import { useChat } from '../../hooks';

const Add = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelNames = channels.map((channel) => channel.name);
  const chatApi = useChat();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: yup.object().shape({
      channelName: yup.string().notOneOf(channelNames, t('modals.validation.notUnique')).required(t('modals.validation.requiredField')),
    }),
    onSubmit: async ({ channelName }, helpers) => {
      helpers.setSubmitting(true);
      chatApi.postNewChannel({ name: channelName });
      dispatch(actions.closeModal());
      helpers.setSubmitting(false);
      toast.success(t('modals.add.toast'));
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
        <Modal.Title>{t('modals.add.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <fieldset disabled={formik.isSubmitting}>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="position-relative">
              <Form.Control isInvalid={formik.errors.channelName} ref={inputRef} name="channelName" onChange={formik.handleChange} value={formik.values.channelName} />
              <Form.Control.Feedback tooltip type="invalid">{formik.errors.channelName}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </fieldset>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(actions.closeModal())} variant="secondary">{t('modals.add.cancelButton')}</Button>
        <Button onClick={formik.handleSubmit} type="submit" variant="primary">{t('modals.add.confirmButton')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Add;
