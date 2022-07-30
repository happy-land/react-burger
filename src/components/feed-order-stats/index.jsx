import styles from './feed-order-stats.module.css';

export const FeedOrderStats = () => {
  return (
    <div className={styles.container}>
      <div className={styles.ordersBoard}>
        <div className={styles.doneBox}>
          <p className={`${styles.header} text text_type_main-medium`}>Готовы:</p>
          <div className={styles.listWrapper}>
            <div className={styles.ordersListColumn}>
              <ul className={`${styles.orderList} text text_type_digits-default`}>
                <li className={`${styles.listItem} ${styles.listItemDone}`}>034533</li>
                <li className={`${styles.listItem} ${styles.listItemDone}`}>034532</li>
                <li className={`${styles.listItem} ${styles.listItemDone}`}>034530</li>
                <li className={`${styles.listItem} ${styles.listItemDone}`}>034527</li>
                <li className={`${styles.listItem} ${styles.listItemDone}`}>034525</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.inworkBox}>
          <p className={`${styles.header} text text_type_main-medium`}>В работе:</p>
          <div className={styles.listWrapper}>
            <div className={styles.ordersListColumn}>
              <ul className={`${styles.orderList} text text_type_digits-default`}>
                <li className={styles.listItem}>034538</li>
                <li className={styles.listItem}>034541</li>
                <li className={styles.listItem}>034542</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.completedAll}>
        <p className={`${styles.header} text text_type_main-medium`}>Выполнено за все время:</p>
        <p className='text text_type_digits-large'>28 752</p>
      </div>
      <div className={styles.completedToday}>
        <p className={`${styles.header} text text_type_main-medium`}>Выполнено за сегодня:</p>
        <p className='text text_type_digits-large'>138</p>
      </div>
    </div>
  );
};
