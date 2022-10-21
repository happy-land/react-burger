import { FeedOrderStats } from '../components/feed-order-stats';
import { FeedOrderList } from '../components/feed-order-list';
import styles from './feed.module.css';
import { useDispatch, useSelector } from '../hooks/hooks';
import { FC, useEffect } from 'react';
import { FEED_CONNECTION_CLOSE, FEED_CONNECTION_INIT } from '../services/constants';

import { baseWsFeedUrl } from '../utils/constants';

export const FeedPage: FC = () => {
  const dispatch = useDispatch();

  // подключимся к web socket
  useEffect(() => {
    dispatch({
      type: FEED_CONNECTION_INIT,
      payload: baseWsFeedUrl,
    });

    return () => {
      dispatch({ type: FEED_CONNECTION_CLOSE });
    };
  }, [dispatch]);

  const orders = useSelector((store) => store.feed.orders);

  if (!orders.length) {
    return <p>Загрузка данных...</p>;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Лента заказов</h1>
      <div className={styles.feedWrapper}>
        <div className={styles.orderListWrapper}>
          <FeedOrderList orders={orders} />
        </div>
        <FeedOrderStats />
      </div>
    </main>
  );
};
