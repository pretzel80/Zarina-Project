import React from 'react';
import LoginInput from '../../Input/LoginInput';
import { Field } from 'formik';
export function FirstStepFields(props) {
  return (
    <div>
      <h3>CONTACT INFORMATION</h3>
      <div>
        <Field
          component={LoginInput}
          name="email"
          type="text"
          placeholder="Email*"
        />
      </div>
      <div>
        <Field
          component={LoginInput}
          name="name"
          type="text"
          placeholder="First name*"
        />
      </div>
      <div>
        <Field
          component={LoginInput}
          name="secondName"
          type="text"
          placeholder="Last name*"
        />
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: '12px',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
        <Field component="input" name="selfPick" type="checkbox" />
        <label style={{ marginLeft: '5px' }}>I’ll get the order myself. </label>
      </div>
      <div>
        <Field
          component={LoginInput}
          name="address"
          type="text"
          placeholder="Delivery address*"
          disabled={props.values.selfPick === true}
          style={{ display: props.values.selfPick === true && 'none' }}
        />
      </div>
      <div>
        <Field
          component={LoginInput}
          name="mobNumber"
          type="text"
          placeholder="Mobile number starts (380**)*"
        />
      </div>
    </div>
  );
}
export function SecondStepFields(props) {
  return (
    <div>
      <h3>SHIPPING METHOD</h3>
      <div
        style={{ display: props.values.selfPick === true && 'none' }}
        style={{
          display: props.values.selfPick === true ? 'none' : 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '1px solid gray',
          fontSize: '14px',
        }}>
        <div
          style={{
            display: 'flex',
            fontSize: '12px',
            alignItems: 'center',
          }}>
          <Field
            component="input"
            name="deliveryKiev"
            type="checkbox"
            disabled={props.values.selfPick === true}
          />
          <label style={{ marginLeft: '5px' }}>Delivery within Kyiv</label>
        </div>

        <p>Free</p>
      </div>
      <div
        style={{
          display: props.values.selfPick === true ? 'none' : 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '1px solid gray',
          fontSize: '14px',
        }}>
        <div
          style={{
            display: 'flex',
            fontSize: '12px',
            alignItems: 'center',
          }}>
          <Field
            component="input"
            name="deliveryUkraine"
            type="checkbox"
            disabled={props.values.selfPick === true}
          />
          <label style={{ marginLeft: '5px' }}>Delivery within Ukraine</label>
        </div>

        <p>Free</p>
      </div>
      <div
        style={{
          display: props.values.selfPick === true ? 'flex' : 'none',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '1px solid gray',
          width: '300px',
          fontSize: '14px',
        }}>
        <div
          style={{
            display: 'flex',
            fontSize: '12px',
            alignItems: 'center',
          }}>
          <Field
            component="input"
            name="pickLoc"
            type="checkbox"
            disabled={props.values.selfPick === false}
          />
          <label style={{ marginLeft: '5px' }}>Pick-up location</label>
        </div>

        <p>Free</p>
      </div>
      <p style={{ display: props.values.selfPick === true ? 'flex' : 'none' }}>
        Choose your location:
      </p>
      <div
        style={{
          display: props.values.selfPick === true ? 'flex' : 'none',
          fontSize: '12px',
          alignItems: 'center',
        }}>
        <Field
          component="input"
          name="firstPickAddress"
          type="checkbox"
          disabled={props.values.pickLoc === false}
        />
        <label style={{ marginLeft: '5px' }}>
          Kyiv, Tarasa Shevchenko Boulevard, 2, ZARINA Store{' '}
        </label>
      </div>
      <div
        style={{
          display: props.values.selfPick === true ? 'flex' : 'none',
          fontSize: '12px',
          alignItems: 'center',
        }}>
        <Field
          component="input"
          name="secondPickAddress"
          type="checkbox"
          disabled={props.values.pickLoc === false}
        />
        <label style={{ marginLeft: '5px' }}>
          Kyiv, Maidan Nezalezhnosti, Globus, 1st Line, ZARINA Store{' '}
        </label>
      </div>
      <div
        style={{
          display: props.values.selfPick === true ? 'flex' : 'none',
          fontSize: '12px',
          alignItems: 'center',
        }}>
        <Field
          component="input"
          name="thirdPickAddress"
          type="checkbox"
          disabled={props.values.pickLoc === false}
        />
        <label style={{ marginLeft: '5px' }}>
          Kyiv, Berkovetska Street, Lavina Mall, ZARINA Store{' '}
        </label>
      </div>
    </div>
  );
}
export function FinalStepFields(props) {
  return (
    <div>
      <h3>PAYMENT METHOD</h3>

      <div
        style={{
          display: 'flex',
          fontSize: '12px',
          alignItems: 'center',
          paddingBottom: '10px',
          marginBottom: '10px',
          borderBottom: '1px solid black',
        }}>
        <Field
          component="input"
          name="cashPayment"
          type="checkbox"
          disabled={props.values.creditCard === true}
        />
        <label style={{ marginLeft: '5px' }}>Cash</label>
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: '12px',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
        <Field
          component="input"
          name="creditCard"
          type="checkbox"
          disabled={props.values.cashPayment === true}
        />
        <label style={{ marginLeft: '5px' }}>Credit Card</label>
      </div>
      <div>
        <Field
          component={LoginInput}
          name="cardNumber"
          type="text"
          placeholder="Card number must be xxxxxxxxxxxxxxxx"
          disabled={props.values.creditCard === false}
        />
      </div>
      <div>
        <Field
          component={LoginInput}
          name="cardHolder"
          type="text"
          placeholder="Card holder name "
          disabled={props.values.creditCard === false}
        />
      </div>
      <div>
        <Field
          component={LoginInput}
          name="cardDate"
          type="text"
          placeholder="Card date must be MM/YY"
          disabled={props.values.creditCard === false}
        />
      </div>
      <div>
        <Field
          component={LoginInput}
          name="cardCode"
          type="text"
          placeholder="Card code must be xxx"
          disabled={props.values.creditCard === false}
        />
      </div>
    </div>
  );
}

const Fields = {
  FinalStepFields,
  SecondStepFields,
};
export default Fields;
