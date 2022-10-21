import { useCallback } from 'react';
import { Switch, Route, NavLink, useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Profile } from '../components/profile';
import { Orders } from '../components/orders';
import { logout } from '../services/actions/user';
import { getFormattedOrderNumber } from '../utils/order-number-format';

import styles from './profile.module.css';
import { OrderInfo } from '../components/order-info';

export const ProfilePage = () => {
  const isOrders = !!useRouteMatch({ path: '/profile/orders', exact: true });
  const isProfile = !!useRouteMatch({ path: '/profile', exact: true });

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
  
  const orderNumber = useParams().id;

  return (
    <main className={styles.container}>
      {(history.location.pathname === '/profile/orders/' ||
        history.location.pathname === '/profile/orders' ||
        history.location.pathname === '/profile/' ||
        history.location.pathname === '/profile') && (
        <nav className={styles.linkBox}>
          <ul className={styles.linkList}>
            <li className={styles.listItem}>
              <NavLink
                to='/profile'
                className={styles.link}
                activeClassName={isProfile ? styles.linkActive : styles.link}
              >
                Профиль
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <NavLink
                to='/profile/orders'
                className={styles.link}
                activeClassName={isOrders ? styles.linkActive : styles.link}
              >
                История заказов
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <NavLink to='#' onClick={onLogout} className={styles.link}>
                Выход
              </NavLink>
            </li>
          </ul>
          <p className={styles.text}>
            {history.location.pathname === '/profile'
              ? 'В этом разделе вы можете изменить свои персональные данные'
              : 'В этом разделе вы можете просмотреть свою историю заказов'}
          </p>
        </nav>
      )}

      <Switch>
        <Route path='/profile/orders/:id' exact>
          <div className={styles.orderInfoContainer}>
            <p className={`text text_type_digits-default`}>{`#${getFormattedOrderNumber(
              orderNumber
            )}`}</p>
            <OrderInfo />
          </div>
        </Route>
        <Route path='/profile/orders' exact>
          <Orders />
        </Route>

        <Route path='/profile' exact>
          <Profile />
        </Route>
      </Switch>
    </main>
  );
};
