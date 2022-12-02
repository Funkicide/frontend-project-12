import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import * as yup from 'yup';

import { actions } from '../../slices';
import { useChat } from '../../hooks';

const Add = () => {
  const dispatch = useDispatch();
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
      channelName: yup.string().notOneOf(channelNames, 'Name must be unique').required('Required field!'),
    }),
    onSubmit: async ({ channelName }, helpers) => {
      helpers.setSubmitting(true);
      chatApi.postNewChannel({ name: channelName });
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
        <Modal.Title>Добавить канал</Modal.Title>
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
        <Button onClick={() => dispatch(actions.closeModal())} variant="secondary">Отмена</Button>
        <Button onClick={formik.handleSubmit} type="submit" variant="primary">Отправить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Add;
