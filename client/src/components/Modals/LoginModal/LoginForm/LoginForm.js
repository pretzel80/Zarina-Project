import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import LoginInput from '../../../Input/LoginInput';
import * as yup from 'yup';
import axios from 'axios';
import styles from './LoginForm.module.scss';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const isRequired = 'This field is required';
const schema = yup.object().shape({
  loginOrEmail: yup
    .string()
    .required(isRequired)
    .email('Please enter a valid email'),
  password: yup.string().required(isRequired).min(3, 'Enter min 3 characters'),
});
export const LoginForm = props => {
  const [isVisible, setIsVisible] = useState(false);
  // const dispatch = useDispatch();
  const handleSubmit = values => {
    let userData = values;
    axios
      .post(`${process.env.REACT_APP_HOST}/customers/login`, userData)
      .then(loginResult => {
        localStorage.setItem('token', loginResult.data.token);
        window.location.reload();
      });
  };
  const passVisibleHandler = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Formik
      initialValues={{ loginOrEmail: '', password: '' }}
      onSubmit={handleSubmit}
      validationSchema={schema}>
      {formikProps => {
        return (
          <Form className={styles.orderInfo}>
            <div>
              <h3>LOG IN</h3>
              <p>Please enter your details to log in to your Zarina Account.</p>
              <Field
                component={LoginInput}
                name="loginOrEmail"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className={styles.passInput}>
              <Field
                component={LoginInput}
                name="password"
                type={isVisible ? 'text' : 'password'}
                placeholder="Password"
              />
              {!isVisible ? (
                <div className={styles.isVisible} onClick={passVisibleHandler}>
                  {/*<VisibilityOutlinedIcon fontSize="small" />*/}
                </div>
              ) : (
                <div className={styles.isVisible} onClick={passVisibleHandler}>
                  {/*<VisibilityOffOutlinedIcon fontSize="small" />*/}
                </div>
              )}
            </div>
            <div>
              <button type={'submit'}>LOG IN</button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
