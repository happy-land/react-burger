import { useEffect } from 'react';

import { OrderCard } from '../order-card';

import styles from './feed-order-list.module.css';

export const FeedOrderList = ({ orders }) => {
  

  // console.log(orders);
  if (!orders) {
    return <p>no ingredients</p>;
  }
  return (
    orders && (
      <div className={styles.container}>
        {orders.map((order) => (
          <OrderCard order={order} key={order._id} />
        ))}
      </div>
    )
  );
};
