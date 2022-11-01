import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { restorePasswordThunk } from '../../services/actions/password-restore';
import styles from './restore-password-form.module.css';

type TLoginCallback = (e: FormEvent<HTMLFormElement>) => void;

export const RestorePasswordForm: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.user);
  const [email, setEmail] = useState('');

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = useCallback<TLoginCallback>((evt) => {
    evt.preventDefault();
    dispatch(restorePasswordThunk(email));
    history.replace({ pathname: '/reset-password' })
  }, [email, history]);


  if (isAuth) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Восстановление пароля</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.input}>
          <EmailInput
            value={String(email)}
            name={'mail'}
            size={'default'}
            onChange={onEmailChange}
          />
        </div>

        <div className={styles.button}>
          <Button htmlType={'submit'}>Восстановить</Button>
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
