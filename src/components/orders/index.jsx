import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeedOrderList } from '../../components/feed-order-list';
import { ORDERS_CONNECTION_CLOSE, ORDERS_CONNECTION_INIT } from '../../services/actions/orders';
import { baseWsOrdersUrl } from '../../utils/constants';
import { getCookie } from '../../utils/utils';

import styles from './orders.module.css';

export const Orders = () => {
  const dispatch = useDispatch();

  const accessToken = getCookie('accessToken');

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
  console.log(orders);
  if (!orders) {
    return <p>Загрузка данных...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.ordersWrapper}>
        <FeedOrderList orders={orders} />
      </div>
    </div>
  );
};
