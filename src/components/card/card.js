import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card.module.css';

export const Card = ({ data, onClick }) => {


  return (
    <article className={styles.card} onClick={() => onClick(data)}>
      <img className={styles.image} src={data.image} />
      <div className={`${styles.priceContainer} mt-1 mb-1`}>
        <p className='text text_type_digits-default mr-2'>{data.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className='text text_type_main-small'>{data.name}</p>
      <div className={styles.counter}>
        <Counter count={1} size='default' />
      </div>
    </article>
  );
};
