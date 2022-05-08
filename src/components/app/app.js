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

function App() {
  // было:
  // const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  // const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false);

  // const [order, setOrder] = useState({});

  // стало:
  const dispatch = useDispatch();
  const { isIngredientDetailsOpened, item } = useSelector((store) => store.ingredient);
  const { isOrderDetailsOpened, orderNumber } = useSelector((store) => store.order);

  // Закрытие всех модалок
  const closeAllModals = () => {
    // setIsOrderDetailsOpened(false);
    // setIsIngredientDetailsOpened(false);
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
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </div>

      {/* <div className={appStyles.app}>
        <AppHeader />
        <DataContext.Provider
          value={{ data: ingredients.data, order, setOrder, setIsOrderDetailsOpened }}
        >
          <TotalPriceContext.Provider value={{ totalPriceState, totalPriceDispatcher }}>
            <main className={appStyles.container}>
              <BurgerIngredients
                setIsIngredientDetailsOpened={setIsIngredientDetailsOpened}
                setCurrentCardData={setCurrentCardData}
              />
              {!ingredients.isLoading && <BurgerConstructor />}
            </main>
          </TotalPriceContext.Provider>
        </DataContext.Provider>
      </div> */}
    </>
  );
}

export default App;
