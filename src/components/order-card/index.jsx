import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-card.module.css';

export const OrderCard = ({ order }) => {
  const { items } = useSelector((store) => store.ingredients);
  const location = useLocation();
  const maxIngredients = 6;

  const orderObject = useMemo(() => {
    if (!items.length) return null;
    // console.log(order.ingredients);
    const ingredientsInfo = order.ingredients.reduce((acc, item) => {
      const ingredient = items.find((ingredient) => ingredient._id === item);
      if (ingredient) acc.push(ingredient);
      return acc;
    }, []);

    const totalPrice = ingredientsInfo.reduce((acc, item) => {
      return item.type === 'bun' ? acc + item.price * 2 : acc + item.price;
    }, 0);

    const ingredientsVisible = ingredientsInfo.slice(0, maxIngredients);

    let remainCount;
    if (ingredientsInfo.length > maxIngredients) {
      remainCount = ingredientsInfo.length - maxIngredients;
    } else {
      remainCount = null;
    }

    return {
      ...order,
      ingredientsInfo,
      ingredientsVisible,
      totalPrice,
      remainCount,
    };
  }, [order, items]);

  // console.log('orderObject:: ');
  // console.log(orderObject);

  return (
    <Link
      to={{
        pathname: `${location.pathname}/${order.number}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <article className={styles.card}>
        <div className={styles.orderId}>
          <p className={`text text_type_digits-default`}>#{order.number}</p>
          <p className={styles.timestamp}>{order.createdAt}</p>
        </div>
        <h2 className={styles.title}>{order.name}</h2>
        <div className={styles.components}>
          <ul className={styles.imagesWrapper}>
            {orderObject.ingredientsVisible.map((item, index) => {
              let zInd = maxIngredients - index;
              return (
                <li
                  key={index}
                  className={styles.imageWrapper}
                  style={{
                    zIndex: zInd,
                  }}
                >
                  <img 
                  style={{
                    opacity: orderObject.remainCount && maxIngredients === index + 1
                    ? '0.6'
                    : 1,
                  }}
                  className={styles.image} 
                  src={item.image_mobile} 
                  alt={item.name} />
                  {maxIngredients === index + 1 ? (
                    <span className={styles.counter}>+{orderObject.remainCount}</span>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <div className={styles.priceWrapper}>
            <p className='text text_type_digits-default'>{orderObject.totalPrice}</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </article>
    </Link>
  );
};
