import { FC } from 'react';
import styles from './order-details.module.css';
import checkIcon from '../../images/check_icon.png';

interface IOrderDetailsProps {
  orderNumber: number;
}

export const OrderDetails: FC<IOrderDetailsProps> = ({ orderNumber }) => {
  return (
    <div className={styles.container}>
      <p className='text text_type_digits-large mt-10'>{orderNumber}</p>
      <p className=' text text_type_main-medium mt-8'>идентификатор заказа</p>
      <img src={checkIcon} className='mt-15' />
      <p className='mt-15'>Ваш заказ начали готовить</p>
      <p className='text text_color_inactive mt-2 mb-15'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
