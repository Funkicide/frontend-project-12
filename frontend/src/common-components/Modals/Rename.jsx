import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import React, { useRef, useEffect } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { actions } from '../../slices';
import { useApi } from '../../providers/ApiProvider.jsx';
import { channelsSelectors } from '../../slices/channelsSlice';
import { modalSelectors } from '../../slices/modalSlice';

const Rename = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const { id, name: previousName } = useSelector(modalSelectors.item);
  const channels = useSelector(channelsSelectors.channels);
  const channelNames = channels.map(channelsSelectors.channelName);
  const api = useApi();

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
      currentName: yup
        .string()
        .min(3, 'modals.validation.channelNameLength')
        .max(20, 'modals.validation.channelNameLength')
        .notOneOf(channelNames, 'modals.validation.notUnique')
        .required('modals.validation.requiredField'),
    }),
    onSubmit: ({ currentName }) => {
      api.renameChannel(id, currentName);
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
          <Form.Group controlId="currentName">
            <Form.Label visuallyHidden>
              {t('modals.rename.formLabel')}
            </Form.Label>
            <Form.Control
              disabled={formik.isSubmitting}
              isInvalid={formik.errors.currentName}
              ref={inputRef}
              name="currentName"
              onChange={formik.handleChange}
              value={formik.values.currentName}
            />
            <Form.Control.Feedback tooltip type="invalid">
              {t(formik.errors.currentName)}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => dispatch(actions.closeModal())}
          variant="secondary"
        >
          {t('modals.rename.cancelButton')}
        </Button>
        <Button
          disabled={formik.isSubmitting}
          onClick={formik.handleSubmit}
          type="submit"
          variant="primary"
        >
          {formik.isSubmitting
            ? t('modals.rename.loadingStatus')
            : t('modals.rename.confirmButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;
