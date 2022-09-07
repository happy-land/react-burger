import { useCallback, useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Link,
  useLocation,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Profile } from '../components/profile';
import { Orders } from '../components/orders';
import { logout } from '../services/actions/user';

import styles from './profile.module.css';

export const ProfilePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((store) => store.user);

  const onLogout = useCallback(
    (evt) => {
      evt.preventDefault();
      console.log('logout');
      dispatch(logout()).then(() => {
        history.replace({ pathname: '/login' });
      });
    },
    [isAuth, history]
  );

  return (
    <main className={styles.container}>
      <nav className={styles.linkBox}>
        <ul className={styles.linkList}>
          <li className={styles.listItem}>
            <Link to='/profile' className={`${styles.link} ${styles.linkActive}`}>
              Профиль
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link to='/profile/orders' className={styles.link}>
              История заказов
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link to='#' onClick={onLogout} className={styles.link}>
              Выход
            </Link>
          </li>
        </ul>
        <p className={styles.text}>
          {history.location.pathname === '/profile'
            ? 'В этом разделе вы можете изменить свои персональные данные'
            : 'В этом разделе вы можете просмотреть свою историю заказов'}
        </p>
      </nav>
      <Switch>
        <Route path='/profile/orders'>
          <Orders />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
      </Switch>
    </main>
  );
};
