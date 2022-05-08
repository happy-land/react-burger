import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { menuItemPropTypes } from '../../utils/constants';
import styles from './card.module.css';

export const Card = ({ data, onClick }) => {
  // drag and drop
  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: 'NEW_INGREDIENT',
  //   item: data,
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //     handlerId: monitor.getHandlerId(),
  //   }),
  // }));

  // const opacity = isDragging ? 0.4 : 1;

  return (
    <article
      // ref={drag}
      // style={{ opacity }}
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
        <Counter count={1} size='default' />
      </div>
    </article>
  );
};

Card.propTypes = {
  data: menuItemPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
};
