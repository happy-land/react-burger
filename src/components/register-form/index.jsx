import { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './register-form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../services/actions/user';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.user);

  const [form, setValue] = useState({
    email: '',
    password: '',
    name: '',
  });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let register = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(registerUser(form));
    },
    [form]
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
            onChange={onChange}
            value={form.name}
            name={'name'}
            size={'default'}
          />
        </div>
        <div className={styles.input}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={onChange}
            value={form.email}
            name={'email'}
            size={'default'}
          />
        </div>

        <div className={styles.input}>
          <PasswordInput
            value={form.password}
            name={'password'}
            size={'default'}
            onChange={onChange}
          />
        </div>

        <div className={styles.button}>
          <Button className={styles.button}>Зарегистрироваться</Button>
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
