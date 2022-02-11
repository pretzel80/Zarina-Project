import React, { useState } from 'react';
import axios from 'axios';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import { setIsAuth } from '../../../../pages/ProductsPage';

import { closeModal } from './../loginModalSlice';
import { useDispatch } from 'react-redux';

const CreateAccount = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const registrationHandler = values => {
    const newCustomer = {
      firstName: values.firstName,
      lastName: values.lastName,
      login: values.firstName,
      email: values.email,
      password: values.password,
      telephone: '+380000000000',
      gender: values.sex,
    };
    axios
      .post(`${process.env.REACT_APP_HOST}/customers`, newCustomer)
      .then(res => {
        axios
          .post(`${process.env.REACT_APP_HOST}/customers/login`, {
            loginOrEmail: newCustomer.email,
            password: newCustomer.password,
          })
          .then(loginResult => {
            dispatch(setIsAuth(true));
            localStorage.setItem('token', loginResult.data.token);
            dispatch(closeModal());
          });
        setSuccess(true);
      })
      .catch(err => setError(err.response.data.message));
  };

  return (
    <>
      {!success ? (
        <RegistrationForm func={registrationHandler} error={error} />
      ) : null}
    </>
  );
};

export default CreateAccount;
