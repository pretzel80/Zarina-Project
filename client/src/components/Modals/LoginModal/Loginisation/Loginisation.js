import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';

import style from './Loginisation.module.scss';
import axios from 'axios';
import LoginInput from '../../../Input/LoginInput';
import { setIsAuth } from '../../../../pages/ProductsPage';
import { useDispatch } from 'react-redux';
import { closeModal } from './../loginModalSlice';

const isRequired = 'This field is required';
const schema = yup.object().shape({
  loginOrEmail: yup
    .string()
    .required(isRequired)
    .email('Please enter a valid email'),
  password: yup.string().required(isRequired).min(3, 'Enter min 3 characters'),
});

const Loginisation = props => {
  const dispatch = useDispatch();

  const handleSubmit = values => {
    let userData = values;

    axios
      .post(`${process.env.REACT_APP_HOST}/customers/login`, userData)
      .then(loginResult => {
        dispatch(setIsAuth(true));
        localStorage.setItem('token', loginResult.data.token);
        dispatch(closeModal());
      });
  };
  return (
    <Formik
      initialValues={{ loginOrEmail: '', password: '' }}
      onSubmit={handleSubmit}
      validationSchema={schema}>
      {formikProps => {
        return (
          <Form className={style.login}>
            <div>
              <h2 className={style.login__title}>LOG IN</h2>
              <p className={style.login__text}>
                Please enter your details to log in to your Zarina Account.
              </p>
            </div>
            <div className={style.form}>
              <Field
                className={style.form__input}
                component={LoginInput}
                name="loginOrEmail"
                type="text"
                placeholder="Email"
              />
              <Field
                className={style.form__input}
                component={LoginInput}
                name="password"
                type={'password'}
                placeholder="Password"
              />

              <button className={style.form__button} type={'submit'}>
                LOG IN
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Loginisation;
