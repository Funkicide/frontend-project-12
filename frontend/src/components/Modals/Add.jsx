import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import React, { useRef, useEffect } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { actions } from '../../slices';
import { useApi } from '../../providers/ApiProvider.jsx';
import { channelsSelectors } from '../../slices/channelsSlice';

const Add = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const channels = useSelector(channelsSelectors.channels);
  const channelNames = channels.map(channelsSelectors.channelName);
  const api = useApi();

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
      channelName: yup
        .string()
        .min(3, 'modals.validation.channelNameLength')
        .max(20, 'modals.validation.channelNameLength')
        .notOneOf(channelNames, 'modals.validation.notUnique')
        .required('modals.validation.requiredField'),
    }),
    onSubmit: ({ channelName }) => {
      api.addNewChannel(channelName);
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
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group controlId="channelName">
            <Form.Label visuallyHidden>{t('modals.add.formLabel')}</Form.Label>
            <Form.Control
              disabled={formik.isSubmitting}
              isInvalid={formik.errors.channelName}
              ref={inputRef}
              name="channelName"
              onChange={formik.handleChange}
              value={formik.values.channelName}
            />
            <Form.Control.Feedback tooltip type="invalid">
              {t(formik.errors.channelName)}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => dispatch(actions.closeModal())}
          variant="secondary"
        >
          {t('modals.add.cancelButton')}
        </Button>
        <Button
          disabled={formik.isSubmitting}
          onClick={formik.handleSubmit}
          type="submit"
          variant="primary"
        >
          {formik.isSubmitting
            ? t('modals.add.loadingStatus')
            : t('modals.add.confirmButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Add;
