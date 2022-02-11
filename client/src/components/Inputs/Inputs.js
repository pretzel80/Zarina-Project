import * as React from 'react';
import './Inputs.scss';
import Button from '@mui/material/Button';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const SignupSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'Занадто коротке')
    .max(50, 'Занадто довге')
    .required("Обов'язково"),
  email: yup
    .string()
    .email('Невірний формат електронної адреси')
    .required("Обов'язково"),
  number: yup
    .string()
    .min(10, 'Занадто короткий')
    .max(11, 'Занадто довгий')
    .required("Обов'язково"),
  comment: yup.string().required("Обов'язково"),
});

function Inputs() {
  return (
    <div className="InputGroup">
      <p className="Legend">
        <b>Зв'язатися з нами</b>
      </p>
      <Formik
        initialValues={{
          firstName: '',
          email: '',
          number: '',
          comment: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          console.log(values);
        }}>
        {({ errors, touched }) => (
          <Form>
            <div className="field name">
              <Field
                className="form-w"
                placeholder="Имя"
                type="text"
                name="firstName"
              />
              {touched.firstName && errors.firstName && (
                <p className={'error'}>{errors.firstName}</p>
              )}
            </div>
            <div className="field email">
              <Field
                className="form-w"
                placeholder="Email"
                type="email"
                name="email"
              />
              {touched.email && errors.email && (
                <p className={'error'}>{errors.email}</p>
              )}
            </div>
            <div className="field number">
              <Field
                className="form-w"
                placeholder="Номер"
                type="phone"
                name="number"
              />
              {touched.number && errors.number && (
                <p className={'error'}>{errors.number}</p>
              )}
            </div>

            <div className="field comment">
              <Field
                className="form_area-w"
                as="textarea"
                placeholder="Коментар"
                type="text"
                name="comment"
              />
              {touched.comment && errors.comment && (
                <p className={'error'}>{errors.comment}</p>
              )}
            </div>

            <Button type="submit" className="btn" variant="contained">
              Відправити
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Inputs;
