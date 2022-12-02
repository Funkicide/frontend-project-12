import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {
  Form, Button, FloatingLabel,
} from 'react-bootstrap';
import {
  useNavigate,
} from 'react-router-dom';
import {
  useState, useRef, useEffect,
} from 'react';

import routes from '../../routes.js';
import { useAuth } from '../../hooks/index.jsx';

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, [authFailed]);

  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: async ({ username, password }) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.api.loginPath(), { username, password });
        console.log(data);
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        navigate(routes.pages.rootPath());
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          formik.errors.auth = 'the username or password is incorrect';
          inputRef.current.focus();
          return;
        }
        throw error;
      }
    },
  });
  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <fieldset disabled={formik.isSubmitting}>
            <Form onSubmit={formik.handleSubmit} className="p-3">
              <h1 className="text-center mb-4">Войти</h1>
              <Form.Group className="mb-3 position-relative">
                <FloatingLabel label="Enter username">
                  <Form.Control
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder="Enter username"
                    isInvalid={authFailed || formik.errors.username}
                    ref={inputRef}
                  />
                  {formik.errors.username && <Form.Control.Feedback tooltip type="invalid">{formik.errors.username}</Form.Control.Feedback>}
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-4 position-relative">
                <FloatingLabel label="Enter password">
                  <Form.Control
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Enter password"
                    isInvalid={authFailed || formik.errors.password}
                  />
                  <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
                  {authFailed && <Form.Control.Feedback tooltip type="invalid">{formik.errors.auth}</Form.Control.Feedback>}
                </FloatingLabel>
              </Form.Group>
              <div className="w-100">
                <Button className="w-100" variant="primary" type="submit">
                  Submit
                </Button>
              </div>

            </Form>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
