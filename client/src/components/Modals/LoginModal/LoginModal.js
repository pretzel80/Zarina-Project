import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from './loginModalSlice';
import CreateAccount from './CreateAccount/CreateAccount';
import Loginisation from './Loginisation/Loginisation';

import style from './LoginModal.module.scss';
import close from './Clear.svg';

const LoginModal = props => {
  const [createModal, setCreateModal] = useState(false);

  const modalHandler = () => {
    setCreateModal(true);
  };

  const dispatch = useDispatch();

  const modalClose = e => {
    if (e.target.id === 'x' || e.target.id === 'y') {
      dispatch(closeModal());
    }
  };

  return (
    <div onClick={modalClose} className={style.modal__field} id={'x'}>
      <div className={style.modal}>
        <img
          onClick={modalClose}
          className={style.modal__close_button}
          src={close}
          alt="close"
          id={'y'}
        />
        {createModal === false ? (
          <div className={style.modal__container}>
            <div className={style.loginField}>
              <Loginisation />
            </div>
            <hr className={style.modal__middleLine} />
            <div className={style.registration}>
              <h2 className={style.registration__title}>CREATE YOUR ACCOUNT</h2>
              <p className={style.registration__text}>
                By creating Zarina Account, you will be able to place your order
                faster, store multiple shipping addresses, view and track
                orders, and perform many other operations.
              </p>
              <button
                className={style.registration__button}
                onClick={modalHandler}>
                REGISTER
              </button>
            </div>
          </div>
        ) : (
          <CreateAccount />
        )}
      </div>
    </div>
  );
};

export default LoginModal;
