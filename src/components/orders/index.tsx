import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { FeedOrderList } from '../feed-order-list';
import { ORDERS_CONNECTION_CLOSE, ORDERS_CONNECTION_INIT } from '../../services/constants';
import { baseWsOrdersUrl } from '../../utils/constants';
import { getCookie } from '../../utils/utils';

import styles from './orders.module.css';

export const Orders: FC = () => {
  const dispatch = useDispatch();

  const accessToken: string | undefined = getCookie('accessToken');

  // подключимся к web socket
  useEffect(() => {
    dispatch({
      type: ORDERS_CONNECTION_INIT,
      payload: `${baseWsOrdersUrl}?token=${accessToken}`,
    });

    return () => {
      dispatch({ type: ORDERS_CONNECTION_CLOSE });
    };
  }, [dispatch]);

  const orders = useSelector((store) => store.orders.orders);
  if (!orders) {
    return <p>Загрузка заказов...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.ordersWrapper}>
        <FeedOrderList orders={orders} />
      </div>
    </div>
  );
};
