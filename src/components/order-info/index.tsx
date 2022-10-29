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

  const getUniqueIngredientsWithQuantity = (
    arr: Array<string>
  ): Array<{ id: string; qty: number }> => {
    let arrWithQty: Array<{ id: string; qty: number }> = [];

    arrWithQty.push({
      id: arr[0],
      qty: 1,
    });

    arr.map((id: string, index: number) => {
      if (index > 0) {
        const element = arrWithQty.find((el) => {
          return el.id === id;
        });
        if (!element) {
          arrWithQty.push({ id, qty: 1 });
        } else {
          // найти индекс элемента по значению
          const indexofDuplicate: number = arrWithQty.indexOf(element);
          arrWithQty[indexofDuplicate].qty += 1;
        }
      }
    });
    return arrWithQty;
  };

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
  const [orderToShow, setOrderToShow] = useState<TOrder>();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (orders) {
      const order = orders.find((ord) => ord.number.toString() === params.id);
      setOrderToShow(order);
    }
  }, [orders, orderToShow, params.id]);

  const orderObject = useMemo(() => {
    if (!items || !orderToShow) return null;

    // Array [ {id: number, qty: string} ]
    const ingredientsUnique = getUniqueIngredientsWithQuantity(orderToShow.ingredients);

    const ingredientsInfo: Array<TIngredient> = ingredientsUnique.reduce(
      (acc: Array<TIngredient>, item: { id: string; qty: number }) => {
        const ingredient = items.find((ingredient: TIngredient) => {
          return ingredient._id === item.id;
        });
        if (ingredient) {
          acc.push(ingredient);
        }
        return acc;
      },
      []
    );

    const totalPrice = ingredientsInfo.reduce((acc, item, index) => {
      return item.type === 'bun'
        ? acc + item.price * 2
        : acc + item.price * ingredientsUnique[index].qty;
    }, 0);

    return {
      ...orderToShow,
      ingredientsInfo,
      ingredientsUnique,
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
                    {item.type === 'bun' ? '2' : orderObject.ingredientsUnique[index].qty}{' '}
                    x {item.price}
                  </p>
                  <CurrencyIcon type='primary' />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.footer}>
            <p className={styles.timestamp}>
              {formatDate((orderToShow as TOrder).createdAt)}
            </p>
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
