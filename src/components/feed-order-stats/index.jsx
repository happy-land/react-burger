import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getFormattedOrderNumber } from '../../utils/order-number-format';
import styles from './feed-order-stats.module.css';

export const FeedOrderStats = () => {
  const { orders, total, totalToday } = useSelector((store) => store.feed);

  const ordersToShow = useMemo(() => {
    if (!orders.length) return null;
    return orders.slice(0, 10);
  }, [orders]);

  return (
    orders && (
      <div className={styles.container}>
        <div className={styles.ordersBoard}>
          <div className={styles.doneBox}>
            <p className={`${styles.header} text text_type_main-medium`}>Готовы:</p>
            <div className={styles.listWrapper}>
              <div className={styles.ordersListColumn}>
                <ul className={`${styles.orderList} text text_type_digits-default`}>
                  {ordersToShow.map((order, index) => {
                    if (order.status === 'done') {
                      return (
                        <li
                          key={order._id}
                          className={`${styles.listItem} ${styles.listItemDone}`}
                        >
                          {getFormattedOrderNumber(order.number)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.inworkBox}>
            <p className={`${styles.header} text text_type_main-medium`}>В работе:</p>
            <div className={styles.listWrapper}>
              <div className={styles.ordersListColumn}>
                <ul className={`${styles.orderList} text text_type_digits-default`}>
                  {ordersToShow.map((order) => {
                    if (order.status === 'pending') {
                      return (
                        <li key={order._id} className={`${styles.listItem}`}>
                          {getFormattedOrderNumber(order.number)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.completedAll}>
          <p className={`${styles.header} text text_type_main-medium`}>
            Выполнено за все время:
          </p>
          <p className='text text_type_digits-large'>{total}</p>
        </div>
        <div className={styles.completedToday}>
          <p className={`${styles.header} text text_type_main-medium`}>
            Выполнено за сегодня:
          </p>
          <p className='text text_type_digits-large'>{totalToday}</p>
        </div>
      </div>
    )
  );
};
