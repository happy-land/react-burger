import { FC } from 'react';
import { TOrder } from '../../types/types';
import { OrderCard } from '../order-card';
import styles from './feed-order-list.module.css';

interface IFeedOrderListProps {
  orders: Array<TOrder>;
}

export const FeedOrderList: FC<IFeedOrderListProps> = ({ orders }) => {
  console.log(orders);
  if (!orders) {
    return <p>no ingredients</p>;
  }
  return (
    orders && (
      <div className={styles.container}>
        {orders.map((order: TOrder) => (
          <OrderCard order={order} key={order._id} />
        ))}
      </div>
    )
  );
};
