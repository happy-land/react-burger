import styles from './burger-constructor.module.css';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  addBun,
  addIngredient,
  removeIngredient,
  saveOrder,
} from '../../services/actions/burger';
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';

export const BurgerConstructor = () => {
  const history = useHistory();
  // Получение списка ингредиентов для конструктора бургера.
  // Используется в компоненте BurgerConstructor.
  const dispatch = useDispatch();
  const { items, totalPrice, bun, isLoading } = useSelector((store) => store.burger);
  const { isAuth } = useSelector((store) => store.user);

  // drop
  const [{ canDrop, isHover }, dropTarget] = useDrop(() => ({
    accept: 'NEW_INGREDIENT',
    drop: (item) =>
      item.type === 'bun' ? dispatch(addBun(item)) : dispatch(addIngredient(item)),
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isHover: monitor.isOver(),
    }),
  }));

  const handleOrderClick = () => {
    if (isAuth) {
      dispatch(saveOrder(items));
    } else {
      history.replace({ pathname: '/login' });
    }
  };

  const handleClose = (item) => {
    dispatch(removeIngredient(item));
  };

  const renderButtonState = () => {
    if (bun === null || items.length === 0 || isLoading) return true;
  };

  const renderBun = (bun, type) => {
    return (
      <div>
        <ConstructorElement
          className={styles.bunElement}
          type={type === 'верх' ? 'top' : 'bottom'}
          isLocked={true}
          text={`${bun.name} (${type})`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    );
  };

  return (
    <div className={`${styles.container} pt-25 pr-4 pl-4`} ref={dropTarget}>
      {/* верхняя булка */}
      {bun && renderBun(bun, 'верх')}

      <div className={styles.innerIngredients}>
        {items.length === 0 ? (
          <div className={styles.emptyBox}>
            <p>Перетащите сюда булку и ингредиенты</p>
          </div>
        ) : (
          items.map((item, index) => (
            <BurgerConstructorElement
              key={item.id}
              item={item}
              index={index}
              handleClose={handleClose}
            />
          ))
        )}
      </div>

      {/* нижняя булка */}
      {bun && renderBun(bun, 'низ')}

      <div className={`${styles.info} mt-10 pr-7`}>
        <div className={`${styles.totalContainer} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button onClick={() => handleOrderClick()} disabled={renderButtonState()}>
          {!isLoading && `Оформить заказ`}
          {isLoading && `Подождите...`}
        </Button>
      </div>
    </div>
  );
};
