import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

import { OrderCard } from '../order-card';

import styles from './feed-order-list.module.css';

export const FeedOrderList = ({ orders }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { items } = useSelector((store) => store.ingredients);

  // console.log(orders);
  if (!items) {
    return <p>no ingredients</p>;
  }
  return (
    items && (
      <div className={styles.container}>
        {orders.map((order) => (
          <OrderCard order={order} ingredients={items} key={order._id} />
        ))}
      </div>
    )
  );
};
