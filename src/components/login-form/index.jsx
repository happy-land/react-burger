import { useCallback } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../services/actions/user';

import styles from './login-form.module.css';
import { useForm } from '../../hooks/useForm';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.user);

  const location = useLocation();

  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  const login = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(authUser(values));
    },
    [values, dispatch]
  );

  if (isAuth) {
    return (
      <Redirect
        // // Если объект state не является undefined, вернём пользователя назад.
        to={location.state?.from || '/'}
      />
    );
  }

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Вход</h1>
      <form className={styles.form} onSubmit={login}>
        <div className={styles.input}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            value={values.email}
            name={'email'}
            size={'default'}
          />
        </div>

        <div className={styles.input}>
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={'password'}
            size={'default'}
          />
        </div>

        <div className={styles.button}>
          <Button className={styles.button}>Войти</Button>
        </div>
      </form>
      <div className={styles.additionalActions}>
        <div className={styles.registration}>
          <p className={styles.text}>Вы — новый пользователь? </p>
          <Link to='/register' className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>
        <div className={styles.forgotPassword}>
          <p className={styles.text}>Забыли пароль?</p>
          <Link to='/forgot-password' className={styles.link}>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
};
