// компонент отображает информацию о заказе
// вызывается на страницах:
// feed/:id
// orders/:id

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { useParams, useHistory, useRouteMatch } from 'react-router-dom';

import {
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_INIT,
  ORDERS_CONNECTION_CLOSE,
  ORDERS_CONNECTION_INIT,
} from '../../services/constants';

import { baseWsFeedUrl, baseWsOrdersUrl } from '../../utils/constants';
import { getCookie } from '../../utils/utils';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-info.module.css';
import { formatDate } from '../../utils/date-format';
import { TIngredient, TOrder } from '../../services/types/data';

export const OrderInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const path = useRouteMatch().path;

  const orders = useSelector((store) => {
    if (path === '/feed/:id') {
      return store.feed.orders;
    }
    if (path === '/profile/orders/:id') {
      return store.orders.orders;
    }
  });

  // подключимся к web socket
  useEffect(() => {
    if (orders !== undefined) {
      if (orders.length === 0 && path === '/feed/:id') {
        dispatch({
          type: FEED_CONNECTION_INIT,
          payload: baseWsFeedUrl,
        });
      }
      if (orders.length === 0 && path === '/profile/orders/:id') {
        const accessToken = getCookie('accessToken');
        dispatch({
          type: ORDERS_CONNECTION_INIT,
          payload: `${baseWsOrdersUrl}?token=${accessToken}`,
        });
      }
    }

    return () => {
      dispatch({ type: FEED_CONNECTION_CLOSE });
    };
  }, [dispatch]);

  const { items } = useSelector((store) => store.ingredients);
  const [orderToShow, setOrderToShow] = useState<TOrder | undefined>();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (orders) {
      const order = orders.find((ord) => ord.number.toString() === params.id);
      setOrderToShow(order);
    }
  }, [orders, orderToShow, params.id]);

  const orderObject = useMemo(() => {
    if (!items || !orderToShow) return null;

    const ingredientsUniqueObj: Array<number> = orderToShow.ingredients.reduce((acc: Array<number>, el: string) => {
      acc[Number(el)] = (acc[Number(el)] || 0) + 1;
      return acc;
    }, []);

    const ingredientsUniqueIds: Array<string> = Object.keys(ingredientsUniqueObj);
    const ingredientsUniqueQty: Array<number> = Object.values(ingredientsUniqueObj);

    const ingredientsInfo = ingredientsUniqueIds.reduce((acc: Array<TIngredient>, item: string, index: number) => {
      const ingredient = items.find((ingredient) => ingredient._id === item);
      if (ingredient) {
        acc.push(ingredient);
      }
      return acc;
    }, []);

    const totalPrice = ingredientsInfo.reduce((acc, item, index) => {
      return item.type === 'bun'
        ? acc + item.price * 2
        : acc + item.price * ingredientsUniqueQty[index];
    }, 0);

    return {
      ...orderToShow,
      ingredientsInfo,
      ingredientsUniqueQty,
      totalPrice,
    };
  }, [orderToShow, items]);

  if (!orderObject) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      {orderObject && (
        <div className={styles.container}>
          <h1 className={styles.title}>{(orderToShow as TOrder).name}</h1>
          <p className={styles.status}>
            {orderObject.status === 'done'
              ? 'Выполнен'
              : orderObject.status === 'pending'
              ? 'Готовится'
              : 'Отменен'}
          </p>
          <p className={styles.ingredientsHeader}>Состав:</p>
          <ul className={styles.ingredientsWrapper}>
            {orderObject.ingredientsInfo.map((item, index) => (
              <li className={styles.listItem} key={index}>
                <div className={styles.itemWrapper}>
                  <div className={styles.borderBox}>
                    <img
                      className={styles.image}
                      src={item.image_mobile}
                      alt={item.name}
                    />
                  </div>
                  <p className={styles.name}>{item.name}</p>
                </div>
                <div className={styles.priceWrapper}>
                  <p className={`${styles.price} text text_type_digits-default`}>
                    {item.type === 'bun' ? '2' : orderObject.ingredientsUniqueQty[index]}{' '}
                    x {item.price}
                  </p>
                  <CurrencyIcon type='primary' />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.footer}>
            <p className={styles.timestamp}>{formatDate((orderToShow as TOrder).createdAt)}</p>
            <div className={styles.totalPriceWrapper}>
              <p className={`${styles.totalPrice} text text_type_digits-default`}>
                {orderObject.totalPrice}
              </p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
