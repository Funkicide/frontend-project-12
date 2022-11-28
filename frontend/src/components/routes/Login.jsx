import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
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
  }, []);

  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: async ({ username, password }) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.loginPath(), { username, password });
        console.log(data);
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        navigate('/');
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          console.log(inputRef.current);
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
                    isValid={formik.touched.username && !formik.errors.username}
                    isInvalid={!!formik.errors.username}
                    ref={inputRef}
                  />
                  <Form.Control.Feedback tooltip type="invalid">{formik.errors.username}</Form.Control.Feedback>
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
                    placeholder="Enter password"
                    isValid={formik.touched.password && !formik.errors.password}
                    isInvalid={!!formik.errors.password}
                  />
                  <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                {authFailed && <div className="text-center bg-danger text-white">the username or password is incorrect</div>}
              </div>

            </Form>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
