import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {
  Form, Button, FloatingLabel, Card,
} from 'react-bootstrap';
import {
  useNavigate,
} from 'react-router-dom';
import {
  useState, useRef, useEffect,
} from 'react';

import routes from '../../routes.js';
import { useAuth } from '../../hooks/index.jsx';

const SighUp = () => {
  const [didSignUpFail, setSignUpFail] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, [didSignUpFail]);

  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().min(3).max(20).required(),
      password: yup.string().min(6).required(),
      passwordConfirmation: yup.string()
        .test(
          'confirmPassword',
          'Пароли должны совпадать',
          (password, context) => password === context.parent.password,
        ),
    }),
    onSubmit: async ({ username, password }) => {
      setSignUpFail(false);
      // formik.setSubmitting(true);
      try {
        const { data } = await axios.post(routes.api.signUpPath(), { username, password });
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        navigate(routes.pages.rootPath());
      } catch (error) {
        // formik.setSubmitting(false);
        setSignUpFail(true);
        console.log(error);
        if (error.isAxiosError && error.response.status === 409) {
          inputRef.current.focus();
          console.log(error);
          return;
        }
        throw error;
      }
    },
  });
  return (
    <div className="container-fluid h-100">
      <div className="h-100 row justify-content-center align-content-center">
        <div className="col-12 col-md-5 col-lg-4 col-xxl-3">
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <fieldset disabled={formik.isSubmitting}>
                <Form onSubmit={formik.handleSubmit} className="p-4">
                  <h1 className="text-center mb-4">Регистрация</h1>
                  <Form.Group className="mb-3 position-relative">
                    <FloatingLabel label="Enter username">
                      <Form.Control
                        id="username"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        placeholder="Enter username"
                        isInvalid={didSignUpFail
                          || (formik.touched.username && formik.errors.username)}
                        ref={inputRef}
                      />
                      {formik.errors.username
                        && formik.touched.username
                        && <Form.Control.Feedback tooltip type="invalid">{formik.errors.username}</Form.Control.Feedback>}
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3 position-relative">
                    <FloatingLabel label="Enter password">
                      <Form.Control
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        type="password"
                        placeholder="Enter password"
                        isInvalid={didSignUpFail
                          || (formik.touched.password && formik.errors.password)}
                      />
                      {formik.errors.password
                        && formik.touched.password
                        && <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>}
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-4 position-relative">
                    <FloatingLabel label="Confirm password">
                      <Form.Control
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.passwordConfirmation}
                        type="password"
                        placeholder="Confirm password"
                        isInvalid={didSignUpFail
                          || (formik.touched.passwordConfirmation
                          && formik.errors.passwordConfirmation)}
                      />
                      {formik.errors.passwordConfirmation
                        && formik.touched.passwordConfirmation
                        && <Form.Control.Feedback tooltip type="invalid">{formik.errors.passwordConfirmation}</Form.Control.Feedback>}
                      {didSignUpFail
                        && (!formik.errors.username
                          && !formik.errors.password
                          && !formik.errors.passwordConfirmation)
                        && <Form.Control.Feedback tooltip type="invalid">Такой пользователь уже существует</Form.Control.Feedback>}
                    </FloatingLabel>
                  </Form.Group>
                  <div className="w-100">
                    <Button className="w-100" variant="primary" type="submit">
                      Зарегистрироваться
                    </Button>
                  </div>
                </Form>
              </fieldset>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SighUp;
