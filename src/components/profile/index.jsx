import { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

import styles from './profile.module.css';
import { getUserData, updateUserData, logout } from '../../services/actions/user';

export const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((store) => store.user);

  const [form, setValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  useEffect(() => {
    setValue({
      name: user.name,
      email: user.email,
      password: '',
    });
  }, []);

  const onChange = (evt) => {
    setValue({ ...form, [evt.target.name]: evt.target.value });
  };

  const updateProfile = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(updateUserData(form));
    },
    [form]
  );

  const discardChanges = useCallback(
    (evt) => {
      evt.preventDefault();
      setValue({
        name: user.name,
        email: user.email,
        password: '',
      });
    },
    [form]
  );

  return (
    <div className={styles.container}>
      
      <div className={styles.formBox}>
        <form className={styles.form}>
          <div className={styles.input}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              icon={'EditIcon'}
              value={form.name}
              name={'name'}
              size={'default'}
            />
          </div>
          <div className={styles.input}>
            <Input
              type={'email'}
              placeholder={'Логин'}
              onChange={onChange}
              icon={'EditIcon'}
              value={form.email}
              name={'email'}
              size={'default'}
            />
          </div>
          <div className={styles.input}>
            <Input
              type={'password'}
              placeholder={'Пароль'}
              onChange={onChange}
              icon={'EditIcon'}
              value={form.password}
              name={'password'}
              size={'default'}
            />
          </div>
          <div className={styles.buttonBox}>
            <div className={styles.button}>
              <Button onClick={discardChanges} type='secondary'>
                Отмена
              </Button>
            </div>
            <div className={styles.button}>
              <Button onClick={updateProfile}>Сохранить</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
