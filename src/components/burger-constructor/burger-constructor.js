import { useEffect } from 'react';
import styles from './burger-constructor.module.css';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addToConstructor, removeFromConstructor, saveOrder } from '../../services/actions/burger';

export const BurgerConstructor = () => {
  // Получение списка ингредиентов для конструктора бургера. 
  // Используется в компоненте BurgerConstructor.
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((store) => store.burger);
  // const {} = useSelector();

  // drop
  // const [{ canDrop, dragItem }, drop] = useDrop(() => ({
  //   accept: 'NEW_INGREDIENT',
  //   drop: (item) => dispatch(addToConstructor(item)),
  //   collect: (monitor) => ({
  //     canDrop: monitor.canDrop(),
  //     dragItem: monitor.dragItem(),
  //     isOver: monitor.isOver()
  //   })
  // }));

  const handleOrderClick = () => {
    dispatch(saveOrder(items));
  };

  const handleClose = (item) => {
    console.log(item);
    dispatch(removeFromConstructor(item));
  }

  useEffect(() => {
    // вычислим стоимость всех ингедиентов, находящихся в конструкторе бургера
    const calculateTotalPrice = () => {
      items.map((item, index) => {
        dispatch(addToConstructor(item));
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
        {items
          .filter((item) => item.type !== 'bun')
          .map((item, index) => (
            <div key={index} className={styles.elementContainer}>
              <DragIcon />
              <ConstructorElement
                key={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => handleClose(item)}
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
            {totalPrice}
          </p>
          <CurrencyIcon type='primary' />
        </div>
        <Button onClick={() => handleOrderClick()}>Оформить заказ</Button>
      </div>
    </div>
  );
};
