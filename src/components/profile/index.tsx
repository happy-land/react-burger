import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../hooks/hooks';

import styles from './profile.module.css';
import { getUserDataThunk, updateUserDataThunk } from '../../services/actions/user';
import { TUser } from '../../services/types/data';

export const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const [form, setValue] = useState<TUser>({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    dispatch(getUserDataThunk());
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
      setValue({
        name: user.name,
        email: user.email,
        password: '',
      });
    }
  }, []);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [evt.target.name]: evt.target.value });
  };

  const updateProfile = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(updateUserDataThunk(form));
    },
    [form]
  );

  const discardChanges = useCallback(
    (evt) => {
      evt.preventDefault();
      if (user) {
        setValue({
          name: user.name,
          email: user.email,
          password: user.password,
        });
      }
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
              value={String(form.name)}
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
              value={String(form.email)}
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
              value={String(form.password)}
              name={'password'}
              size={'default'}
            />
          </div>
          <div className={styles.buttonBox}>
            <div className={styles.button}>
              <Button onClick={discardChanges} type='secondary' htmlType={'button'}>
                Отмена
              </Button>
            </div>
            <div className={styles.button}>
              <Button onClick={updateProfile} htmlType={'button'}>Сохранить</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
