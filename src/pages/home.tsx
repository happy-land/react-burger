import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { Modal } from '../components/modal/modal';
import { OrderDetails } from '../components/order-details/order-details';

import { useDispatch, useSelector } from '../hooks/hooks';
import { closeIngredientModalAction } from '../services/actions/ingredientDetails';
import { closeOrderModalAction } from '../services/actions/order';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './home.module.css';
import { FC } from 'react';

export const HomePage: FC = () => {
  const dispatch = useDispatch();
  const { isOrderDetailsOpened, orderNumber } = useSelector((store) => store.order);

  const closeAllModals = (): void => {
    dispatch(closeIngredientModalAction());
    dispatch(closeOrderModalAction());
  };

  return (
    <>
      {isOrderDetailsOpened && (
        <Modal title='' onClose={closeAllModals}>
          <OrderDetails orderNumber={orderNumber!} />
        </Modal>
      )}

      <main className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  );
};
