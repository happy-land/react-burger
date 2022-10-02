import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card.module.css';

interface ICard {
  data: { _id: number; image: string; price: number; name: string };
  counter: number;
  onClick: (data: { _id: number; image: string; price: number; name: string }) => void;
}

export const Card: FC<ICard> = ({ data, counter, onClick }) => {
  const location = useLocation<{ background: Location }>();

  // drag and drop
  const [{ opacity, isDragging }, drag] = useDrag(() => ({
    type: 'NEW_INGREDIENT',
    item: data,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.8 : 1,
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <Link
      to={{
        pathname: `/ingredients/${data._id}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <article
        ref={drag}
        style={{ opacity }}
        className={styles.card}
        onClick={() => onClick(data)}
      >
        <img className={styles.image} src={data.image} />
        <div className={`${styles.priceContainer} mt-1 mb-1`}>
          <p className='text text_type_digits-default mr-2'>{data.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className='text text_type_main-small'>{data.name}</p>
        <div className={styles.counter}>
          {counter > 0 && <Counter count={counter} size='default' />}
        </div>
      </article>
    </Link>
  );
};
