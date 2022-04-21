import { useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import { menuItemPropTypes } from '../../utils/constants';
import { DataContext, TotalPriceContext } from '../../services/appContext';
import { orderUrl } from '../../utils/constants';

export const BurgerConstructor = () => {
  const { totalPriceState, totalPriceDispatcher } = useContext(TotalPriceContext);

  const { data, order, setOrder, setIsOrderDetailsOpened } = useContext(DataContext);

  const handleOrderClick = () => {
    saveOrder(data.map((item) => item._id))
      .then(res => res.ok ? res.json() : Promise.reject('Ошибка!'))
      .then(res => {
        setOrder(res.order.number);
        setIsOrderDetailsOpened(true);
      });
  };

  const saveOrder = (data) => {
    return fetch(orderUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: data
      })
    });
  };

  useEffect(() => {
    // вычислим стоимость всех ингедиентов, находящихся в конструкторе бургера
    const calculateTotalPrice = () => {
      data.map((item, index) => {
        totalPriceDispatcher({ type: 'add', price: item.price });
      });
    };
    calculateTotalPrice();
  }, []);

  return (
    <div className={`${styles.container} pt-25 pr-4 pl-4`}>
      <div>
        <ConstructorElement
          className={styles.bunElement}
          type='top'
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </div>

      <div className={styles.innerIngredients}>
        {data
          .filter((item) => item.type !== 'bun')
          .map((item, index) => (
            <div key={index} className={styles.elementContainer}>
              <DragIcon />
              <ConstructorElement
                key={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
      </div>
      <div>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text='Краторная булка N-200i (низ)'
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </div>
      <div className={`${styles.info} mt-10 pr-7`}>
        <div className={`${styles.totalContainer} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>
            {totalPriceState.totalPrice}
          </p>
          <CurrencyIcon type='primary' />
        </div>
        {/* <Button onClick={() => setIsOrderDetailsOpened(true)}>Оформить заказ</Button> */}
        <Button onClick={() => handleOrderClick()}>Оформить заказ</Button>
      </div>
    </div>
  );
};

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(menuItemPropTypes),
//   setIsOrderDetailsOpened: PropTypes.func.isRequired
// }
