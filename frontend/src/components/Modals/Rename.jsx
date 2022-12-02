import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import * as yup from 'yup';

import { actions } from '../../slices';
import { useChat } from '../../hooks';

const Rename = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { id, name: previousName } = useSelector((state) => state.modal.item);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelNames = channels.map((channel) => channel.name);
  const chatApi = useChat();

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
      currentName: yup.string().notOneOf(channelNames, 'Name must be unique').required('Required field!'),
    }),
    onSubmit: async ({ currentName }, helpers) => {
      helpers.setSubmitting(true);
      chatApi.renameChannel({ id, name: currentName });
      dispatch(actions.closeModal());
      helpers.setSubmitting(false);
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
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <fieldset disabled={formik.isSubmitting}>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="position-relative">
              <Form.Control isInvalid={formik.errors.currentName} ref={inputRef} name="currentName" onChange={formik.handleChange} value={formik.values.currentName} />
              <Form.Control.Feedback tooltip type="invalid">{formik.errors.currentName}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </fieldset>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(actions.closeModal())} variant="secondary">Отмена</Button>
        <Button onClick={formik.handleSubmit} type="submit" variant="primary">Отправить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;
