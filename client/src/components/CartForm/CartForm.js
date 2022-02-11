import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import { createOrder } from '../../pages/Cart/index';
import { useDispatch, connect } from 'react-redux';
import {
  FirstStepFields,
  SecondStepFields,
  FinalStepFields,
} from './Fields/Fields';
import schema from './validationSchema';
import styles from './CartForm.module.scss';
import { withRouter } from 'react-router-dom';
import { fetchCreateOrder } from '../../helpers/CartAPI/index';
import {
  setIsCompleteOrder,
  setIsCreateOrder,
  setFetchedOrders,
} from '../../pages/Cart/index';

export const CartForm = props => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const handleSubmit = values => {
    if (values.selfPick === true) values.address = '';
    setStep(step + 1);
    if (step === 3) {
      setStep(step + 1);
      dispatch(createOrder(values));
    }
  };
  const finalSubmit = () => {
    if (props.order !== null && step === 4) {
      dispatch(fetchCreateOrder(props.order, setFetchedOrders));
      setTimeout(() => {
        dispatch(setIsCreateOrder(false));
        dispatch(setIsCompleteOrder(true));
      }, 2000);
    }
  };
  const renderStep = (step, values, errors, touched) => {
    switch (step) {
      case 1:
        return <FirstStepFields values={values} userData={props.userData} />;
      case 2:
        return <SecondStepFields values={values} />;
      case 3:
        return <FinalStepFields values={values} />;
      case 4:
        return <FinalStepFields values={values} />;
      default:
        return <FirstStepFields values={values} />;
    }
  };
  const buttonText = step => {
    switch (step) {
      case 1:
        return 'CONTINUE TO SHIPPING';
      case 2:
        return 'CONTINUE TO PAYMENT';
      case 3:
        return 'CHECK ORDER';
      case 4:
        return 'COMPLETE ORDER';
      default:
        return 'CONTINUE TO SHIPPING';
    }
  };

  return (
    <Formik
      initialValues={{
        email: props.userData.email,
        name: props.userData.firstName,
        secondName: props.userData.lastName,
        address: '',
        mobNumber: props.userData.telephone,
        selfPick: false,
        deliveryKiev: false,
        deliveryUkraine: false,
        pickLoc: false,
        firstPickAddress: false,
        secondPickAddress: false,
        thirdPickAddress: false,
        cashPayment: true,
        creditCard: false,
        cardNumber: '',
        cardHolder: '',
        cardDate: '',
        cardCode: '',
      }}
      onSubmit={step !== 4 ? handleSubmit : finalSubmit}
      validationSchema={schema}>
      {props => {
        return (
          <Form className={styles.orderInfo}>
            {renderStep(step, props.values)}
            <div>
              <Button
                className={styles.orderSubmit}
                color="primary"
                variant="contained"
                type="submit">
                {buttonText(step)}
              </Button>
              <Button
                className={styles.stepBack}
                color="secondary"
                variant="contained"
                onClick={() => {
                  if (step === 1) {
                    dispatch(setIsCreateOrder(false));
                  }
                  setStep(step - 1);
                }}>
                Back
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
const mapStateToProps = state => {
  return {
    order: state.cartReducer.order,
    userData: state.cartReducer.user,
  };
};
export default withRouter(connect(mapStateToProps)(CartForm));
