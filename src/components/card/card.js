import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { menuItemPropTypes } from '../../utils/constants';
import styles from './card.module.css';

export const Card = ({ data, counter, onClick }) => {
  const location = useLocation();

  // drag and drop
  const [{ opacity, isDragging }, drag] = useDrag(() => ({
    type: 'NEW_INGREDIENT',
    item: data,
    collect: (monitor) => ({
      opacity: monitor.isDragging ? 0.8 : 1,
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

Card.propTypes = {
  data: menuItemPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
};
