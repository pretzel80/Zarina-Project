import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Inputs.scss';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const Input = () => (
  <div>
    <h1>
      <b>Зв'язатися з нами</b>
    </h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}>
      {({ errors, touched }) => (
        <Form>
          <Field
            name="firstName"
            placeholder="Ім'я"
            className="inp"
            data="name"
          />
          {errors.firstName && touched.firstName ? (
            <div className="err">{errors.firstName}</div>
          ) : null}

          <Field name="lastName" />
          {errors.lastName && touched.lastName ? (
            <div>{errors.lastName}</div>
          ) : null}

          <Field name="email" type="email" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Input;
