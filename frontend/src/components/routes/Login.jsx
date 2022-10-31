import { useFormik } from 'formik';
import * as yup from 'yup';

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().min(3, 'Min 3').max(6, 'Max 6').required('Required'),
      password: yup.string().min(6, 'Min 6').required('Required'),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor={formik.username}>
        Username
        <input
          id={formik.username}
          name="username"
          type="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          required
        />
      </label>
      {formik.touched.username && formik.errors.username && (
        <div>{formik.errors.username}</div>
      )}

      <label htmlFor={formik.password}>
        Password
        <input
          id={formik.password}
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />
      </label>
      {formik.touched.password && formik.errors.password && (
        <div>{formik.errors.password}</div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

const Login = () => (
  <div>
    <SignupForm />
  </div>
);

export default Login;
