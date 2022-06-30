import { useEffect, useState } from 'react';

import { AppHeader } from '../components/app-header/app-header';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { Modal } from '../components/modal/modal';
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';
import { OrderDetails } from '../components/order-details/order-details';

import { useDispatch, useSelector } from 'react-redux';
import { closeIngredientModal } from '../services/actions/ingredientDetails';
import { closeOrderModal } from '../services/actions/order';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './home.module.css';

export const HomePage = () => {
  const dispatch = useDispatch();
  const { isIngredientDetailsOpened, item } = useSelector(
    (store) => store.ingredientDetails
  );
  const { isOrderDetailsOpened, orderNumber } = useSelector((store) => store.order);

  const closeAllModals = () => {
    dispatch(closeIngredientModal());
    dispatch(closeOrderModal());
  };

  return (
    <>
      {isOrderDetailsOpened && (
        <Modal title='' onClose={closeAllModals}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
      {isIngredientDetailsOpened && (
        <Modal title='Детали ингредиента' onClose={closeAllModals}>
          <IngredientDetails data={item} />
        </Modal>
      )}

      <div>
        <AppHeader />
        <main className={styles.container}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </div>
    </>
  );
};
