import { FC, useMemo } from 'react';
import { useSelector } from '../../hooks/hooks';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { getFormattedOrderNumber } from '../../utils/order-number-format';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-card.module.css';
import { formatDate } from '../../utils/date-format';
import { TIngredient, TOrder } from '../../services/types/data';

interface IOrderCardProps {
  order: TOrder;
}

export const OrderCard: FC<IOrderCardProps> = ({ order }) => {
  const history = useHistory();
  const { items } = useSelector((store) => store.ingredients);
  const location = useLocation<{ pathname: string }>();
  const maxIngredients: number = 6;

  const orderObject = useMemo(() => {
    if (!items.length) return null;
    const ingredientsInfo = order.ingredients.reduce((acc: Array<TIngredient>, item: string) => {
      const ingredient = items.find((ingredient: TIngredient) => ingredient._id === item);
      if (ingredient) acc.push(ingredient);
      return acc;
    }, []);

    const totalPrice: number = ingredientsInfo.reduce((acc: number, item: TIngredient ) => {
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

  const renderStatus = (status: string): string | null | undefined => {
    if (history.location.pathname !== '/profile/orders') return null;
    if (status === 'created') return 'Создан';
    if (status === 'pending') return 'Готовится';
    if (status === 'done') return 'Выполнен';
    return;
  };

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
          <p className={`text text_type_digits-default`}>
            #{getFormattedOrderNumber(order.number)}
          </p>
          <p className={styles.timestamp}>{formatDate(order.createdAt)}</p>
        </div>
        <h2 className={styles.title}>{order.name}</h2>
        {history.location.pathname === '/profile/orders' ? (
          <p
            className={styles.status}
            style={order.status === 'done' ? { color: '#00CCCC' } : { color: '#F2F2F3' }}
          >
            {renderStatus(order.status)}
          </p>
        ) : null}
        <div className={styles.components}>
          <ul className={styles.imagesWrapper}>
            {orderObject && orderObject.ingredientsVisible.map((item: TIngredient, index: number) => {
              let zInd = maxIngredients - index;

              return (
                <li
                  key={index}
                  className={styles.listItem}
                  style={{
                    zIndex: zInd,
                  }}
                >
                  <div className={styles.borderBox}>
                    <img
                      style={{
                        opacity:
                          orderObject.remainCount && maxIngredients === index + 1
                            ? '0.6'
                            : 1,
                      }}
                      className={styles.image}
                      src={item.image_mobile}
                      alt={item.name}
                    />
                    {maxIngredients === index + 1 ? (
                      <span className={styles.counter}>+{orderObject.remainCount}</span>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={styles.priceWrapper}>
            <p className='text text_type_digits-default'>{orderObject && orderObject.totalPrice}</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </article>
    </Link>
  );
};
