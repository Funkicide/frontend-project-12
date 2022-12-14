import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {
  Form, Button, FloatingLabel, Card,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import routes from '../../routes.js';
import { useAuth } from '../../providers/AuthProvider.jsx';

const SignUpPage = () => {
  const [didSignUpFail, setSignUpFail] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate(routes.pages.rootPath());
    }
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [didSignUpFail]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(3, 'pages.signUp.validation.usernameLength')
        .max(20, 'pages.signUp.validation.usernameLength')
        .required('pages.signUp.validation.requiredField'),
      password: yup
        .string()
        .min(6, 'pages.signUp.validation.passwordLength')
        .required('pages.signUp.validation.requiredField'),
      passwordConfirmation: yup
        .string()
        .test(
          'confirmPassword',
          'pages.signUp.validation.confirmPassword',
          (password, context) => password === context.parent.password,
        ),
    }),
    onSubmit: async ({ username, password }) => {
      setSignUpFail(false);
      // formik.setSubmitting(true);
      try {
        const { data } = await axios.post(routes.api.signUpPath(), {
          username,
          password,
        });
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        navigate(routes.pages.rootPath());
      } catch (error) {
        formik.setSubmitting(false);
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
                  <h1 className="text-center mb-4">
                    {t('pages.signUp.header')}
                  </h1>
                  <Form.Group className="mb-3 position-relative">
                    <FloatingLabel
                      controlId="username"
                      label={t('pages.signUp.usernameLabel')}
                    >
                      <Form.Control
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        placeholder={t('pages.signUp.usernameLabel')}
                        isInvalid={
                          didSignUpFail
                          || (formik.touched.username && formik.errors.username)
                        }
                        ref={inputRef}
                      />
                      {formik.errors.username && formik.touched.username && (
                        <Form.Control.Feedback tooltip type="invalid">
                          {t(formik.errors.username)}
                        </Form.Control.Feedback>
                      )}
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3 position-relative">
                    <FloatingLabel
                      controlId="password"
                      label={t('pages.signUp.passwordLabel')}
                    >
                      <Form.Control
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        type="password"
                        placeholder={t('pages.signUp.passwordLabel')}
                        isInvalid={
                          didSignUpFail
                          || (formik.touched.password && formik.errors.password)
                        }
                      />
                      {formik.errors.password && formik.touched.password && (
                        <Form.Control.Feedback tooltip type="invalid">
                          {t(formik.errors.password)}
                        </Form.Control.Feedback>
                      )}
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-4 position-relative">
                    <FloatingLabel
                      controlId="passwordConfirmation"
                      label={t('pages.signUp.confirmPasswordLabel')}
                    >
                      <Form.Control
                        name="passwordConfirmation"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.passwordConfirmation}
                        type="password"
                        placeholder={t('pages.signUp.confirmPasswordLabel')}
                        isInvalid={
                          didSignUpFail
                          || (formik.touched.passwordConfirmation
                            && formik.errors.passwordConfirmation)
                        }
                      />
                      {formik.errors.passwordConfirmation
                        && formik.touched.passwordConfirmation && (
                          <Form.Control.Feedback tooltip type="invalid">
                            {t(formik.errors.passwordConfirmation)}
                          </Form.Control.Feedback>
                      )}
                      {didSignUpFail
                        && !formik.errors.username
                        && !formik.errors.password
                        && !formik.errors.passwordConfirmation && (
                          <Form.Control.Feedback tooltip type="invalid">
                            {t('pages.signUp.validation.userExists')}
                          </Form.Control.Feedback>
                      )}
                    </FloatingLabel>
                  </Form.Group>
                  <div className="w-100">
                    <Button className="w-100" variant="primary" type="submit">
                      {t('pages.signUp.confirmButton')}
                    </Button>
                  </div>
                </Form>
              </fieldset>
            </Card.Body>
            <Card.Footer className="p-3">
              <div className="text-center">
                <span>{t('pages.signUp.footer.loginHeader')}</span>
                {' '}
                <Card.Link href={routes.pages.loginPath()}>
                  {t('pages.signUp.footer.loginLink')}
                </Card.Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
