import React, { useState } from 'react';
import * as yup from 'yup';
import style from './RegistrationForm.module.scss';
import { Field, Form, Formik } from 'formik';
import Button from '@mui/material/Button';
import LoginInput from '../../../../Input/LoginInput';

export const RegistrationForm = ({ func, error }) => {
  const [privError, setPrivError] = useState(false);
  const isRequired = 'This field is required';
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .typeError('Must be a string')
      .matches(
        /^[A-Za-z ]*$/,
        'Please enter valid name.Name can only contain Latin letters.',
      )
      .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g, '')
      .required(isRequired),
    lastName: yup
      .string()
      .typeError('Must be a string')
      .matches(
        /^[A-Za-z ]*$/,
        'Please enter valid last name.Last name can only contain Latin letters.',
      )
      .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g, '')
      .required(isRequired),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required(isRequired),
    password: yup
      .string()
      .min(7, 'Should be 7 chars minimum.')
      .matches(
        /[0-9A-Za-z]/,
        'Password can only contain Latin letters and numbers.',
      )
      .typeError(
        'At least 8 characters long, containing uppercase and lowercase letters and numbers.',
      )
      .required(isRequired),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'The passwords do not coincide. ')
      .required(isRequired),
    rules: yup.bool().required(isRequired),
  });
  const submitHandler = values => {
    if (values.rules === false) {
      setPrivError(true);
    }
    func(values);
  };

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>CREATE YOUR ACCOUNT</h2>
      <Formik
        initialValues={{
          sex: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          rules: false,
          subscription: false,
        }}
        onSubmit={submitHandler}
        validationSchema={schema}>
        {props => {
          return (
            <Form className={style.form}>
              <div className={style.form__container}>
                <div className={style.form__leftPart}>
                  <div className={style.form__checkboxes}>
                    <p style={{ marginBottom: '10px' }}>
                      {'Salutation' +
                        ' ' +
                        props.values.sex +
                        '.' +
                        props.values.firstName}{' '}
                    </p>
                    <label>
                      <Field
                        className={style.form__checkbox}
                        type="radio"
                        name="sex"
                        value="Mr"
                      />
                      Mr.
                    </label>
                    <label>
                      <Field type="radio" name="sex" value="Ms" />
                      Ms.
                    </label>
                    <label>
                      <Field type="radio" name="sex" value="Mrs" />
                      Mrs.
                    </label>
                  </div>
                  <Field
                    component={LoginInput}
                    className={style.form__input}
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                  />

                  <Field
                    component={LoginInput}
                    className={style.form__input}
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                  />

                  <Field
                    component={LoginInput}
                    className={style.form__input}
                    type="email"
                    name="email"
                    placeholder="Email *"
                  />
                </div>
                <div className={style.form__rightPart}>
                  <Field
                    component={LoginInput}
                    className={style.form__input}
                    type="password"
                    name="password"
                    placeholder="Password *"
                  />

                  <Field
                    component={LoginInput}
                    className={style.form__input}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password *"
                  />

                  <div className={style.form__gogi}>
                    <div className={style.form__rightCheckbox}>
                      <Field
                        className={style.form__checkbox}
                        type="checkbox"
                        name="rules"
                      />
                      <p className={style.form__rightCheckbox_text}>
                        I accept <a href="/">Privacy & Cookies Policy</a> *.
                      </p>{' '}
                      {privError === true && (
                        <p style={{ color: 'red', fontSize: '12px' }}>
                          {isRequired}
                        </p>
                      )}
                    </div>
                    <div className={style.form__rightCheckbox}>
                      <Field
                        className={style.form__checkbox}
                        type="checkbox"
                        name="subscription"
                      />
                      <p className={style.form__rightCheckbox_text}>
                        I want to receive about new creations, events and <br />
                        personalized services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p style={{ color: 'red' }}>{error}</p>
              <Button
                className={style.form__button}
                type="submit"
                color="primary"
                variant="contained">
                Register
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
