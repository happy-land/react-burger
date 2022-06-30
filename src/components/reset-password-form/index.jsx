import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../services/actions/password-reset';

import styles from './reset-password-form.module.css';
import { useDispatch, useSelector } from 'react-redux';

export const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.user);
  const { isPswdRestoreRequestSent } = useSelector((store) => store.passwordRestore);

  const [form, setValue] = useState({
    password: '',
    token: '',
  });

  const [icon, setIcon] = useState('ShowIcon');
  const [inputType, setInputType] = useState('password');

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onIconClick = () => {
    toggleInputMode();
  };

  const toggleInputMode = () => {
    icon === 'ShowIcon' ? setIcon('HideIcon') : setIcon('ShowIcon');
    inputType === 'password' ? setInputType('text') : setInputType('password');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('onSubmit');
    dispatch(resetPassword(form));
  };

  if (isAuth) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  if (!isPswdRestoreRequestSent) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Восстановление пароля</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.input}>
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            onChange={onChange}
            icon={icon}
            onIconClick={onIconClick}
            value={form.password}
            name={'password'}
            size={'default'}
          />
        </div>
        <div className={styles.input}>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onChange}
            value={form.token}
            name={'token'}
            size={'default'}
          />
        </div>

        <div className={styles.button}>
          <Button className={styles.button}>Сохранить</Button>
        </div>
      </form>
      <div className={styles.additionalActions}>
        <div className={styles.recallPassword}>
          <p className={styles.text}>Вспомнили пароль?</p>
          <Link to='/login' className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};
