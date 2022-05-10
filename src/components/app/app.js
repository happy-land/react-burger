import { useEffect, useState } from 'react';

import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';

import appStyles from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeIngredientModal } from '../../services/actions/ingredientDetails';
import { closeOrderModal } from '../../services/actions/order';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const dispatch = useDispatch();
  const { isIngredientDetailsOpened, item } = useSelector((store) => store.ingredientDetails);
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

      <div className={appStyles.app}>
        <AppHeader />
        <main className={appStyles.container}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </div>
    </>
  );
}

export default App;
