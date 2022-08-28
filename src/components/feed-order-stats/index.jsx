import { useSelector } from 'react-redux';
import { getFormattedOrderNumber } from '../../utils/order-number-format';
import styles from './feed-order-stats.module.css';

export const FeedOrderStats = () => {
  const { orders, total, totalToday } = useSelector((store) => store.feed);
  const ordersInColumn = 10;
  let currentIndex = 1;

  return (
    orders && (
      <div className={styles.container}>
        <div className={styles.ordersBoard}>
          <div className={styles.doneBox}>
            <p className={`${styles.header} text text_type_main-medium`}>Готовы:</p>
            <div className={styles.listWrapper}>
              <div className={styles.ordersListColumn}>
                <ul className={`${styles.orderList} text text_type_digits-default`}>
                  {/* <div className={styles.orderColumn}>

                  </div> */}
                  {orders.map((order, index) => {
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
                  {orders.map((order) => {
                    if (order.status === 'pending') {
                      return (
                        <li key={order._id} className={`${styles.listItem}`}>
                          {getFormattedOrderNumber(order.number)}
                        </li>
                      );
                    }
                  })}

                  {/* <li className={styles.listItem}>034538</li>
                  <li className={styles.listItem}>034541</li>
                  <li className={styles.listItem}>034542</li> */}
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
