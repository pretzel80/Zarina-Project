import React from 'react';
import style from './SuccessfulRegistration.module.scss';

const SuccessfulRegistration = props => {
  return (
    <div className={style.success}>
      <h3 className={style.success__title}>
        THANK YOU FOR CREATING AN ACCOUNT WITH ZARINA! NOW YOU CAN LOG IN.
      </h3>
      {/* <p className={style.success__message}>We sent an email to <span className={style.success__email}>{props.data.email}</span> with the instructions to activate your account.</p> */}
    </div>
  );
};

export default SuccessfulRegistration;
