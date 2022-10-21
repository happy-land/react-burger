import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { restorePassword } from '../../services/actions/password-restore';
import styles from './restore-password-form.module.css';

export const RestorePasswordForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.user);
  const [email, setEmail] = useState('');

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(restorePassword())
        .then(() => {
          history.replace({ pathname: '/reset-password' })
        })
    },
    [isAuth, history]
  );


  if (isAuth) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Восстановление пароля</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.input}>
          <EmailInput
            value={email}
            name={'mail'}
            size={'default'}
            onChange={onEmailChange}
          />
        </div>

        <div className={styles.button}>
          <Button className={styles.button}>Восстановить</Button>
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
