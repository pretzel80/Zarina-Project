import React from 'react';
import style from './LoginInput.module.scss';

const LoginInput = props => {
  const { field, form, ...rest } = props;
  const { name } = field;

  return (
    <div className={style.input__item}>
      <input className={style.input} {...rest} {...field} />
      {form.touched[name] && form.errors[name] && (
        <div className={style.input__error}>{form.errors[name]}</div>
      )}
    </div>
  );
};
export default LoginInput;
