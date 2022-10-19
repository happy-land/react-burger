import { FC, FormEvent, useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './register-form.module.css';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { registerUserThunk } from '../../services/actions/user';
import { useForm } from '../../hooks/useForm';

type TRegisterCalback = (e: FormEvent<HTMLFormElement>) => void;

export const RegisterForm: FC = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.user);

  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const register = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(registerUserThunk(values));
    },
    [values, dispatch]
  );

  if (isAuth) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Регистрация</h1>
      <form className={styles.form} onSubmit={register}>
        <div className={styles.input}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChange}
            value={values.name!}
            name={'name'}
            size={'default'}
          />
        </div>
        <div className={styles.input}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            value={values.email!}
            name={'email'}
            size={'default'}
          />
        </div>

        <div className={styles.input}>
          <PasswordInput
            value={values.password}
            name={'password'}
            size={'default'}
            onChange={handleChange}
          />
        </div>

        <div className={styles.button}>
          <Button className={styles.button} htmlType={'button'}>Зарегистрироваться</Button>
        </div>
      </form>
      <div className={styles.additionalActions}>
        <div className={styles.registration}>
          <p className={styles.text}>Уже зарегистрированы?</p>
          <Link to='/login' className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};
