import { useEffect, useReducer, useState } from 'react';

import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';

import { baseUrl } from '../../utils/constants';

import appStyles from './app.module.css';
import { TotalPriceContext, DataContext } from '../../services/appContext';
import { checkResponse } from '../../utils/utils';

const totalPriceInitialState = { totalPrice: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return { totalPrice: state.totalPrice + action.price };
    case 'delete':
      return { totalPrice: state.totalPrice - action.price };
    case 'reset':
      return totalPriceInitialState;
    default:
      throw new Error(`Wrong type of actoion: ${action.type}`);
  }
};

function App() {
  const [totalPriceState, totalPriceDispatcher] = useReducer(
    reducer,
    totalPriceInitialState,
    undefined
  );

  const [ingredients, setIngredients] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false);

  const [order, setOrder] = useState({});

  // стейт выбранной карточки
  const [currentCardData, setCurrentCardData] = useState({});

  // Закрытие всех модалок
  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
  };

  // загрузка с сервера данных
  useEffect(() => {
    const getIngredients = async () => {
      setIngredients({ ...ingredients, isLoading: true, hasError: false });
      fetch(`${baseUrl}/ingredients`)
        .then(checkResponse)
        .then((result) =>
          setIngredients({
            ...ingredients,
            data: result.data,
            isLoading: false,
            hasError: false,
          })
        )
        .catch((e) =>
          setIngredients({ ...ingredients, isLoading: false, hasError: true })
        );
    };
    getIngredients();
  }, []);

  return (
    <>
      {isOrderDetailsOpened && (
        <Modal title='' onClose={closeAllModals}>
          <OrderDetails order={order} />
        </Modal>
      )}
      {isIngredientDetailsOpened && (
        <Modal title='Детали ингредиента' onClose={closeAllModals}>
          <IngredientDetails data={currentCardData} />
        </Modal>
      )}

      <div className={appStyles.app}>
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
              {!ingredients.isLoading && (
                <BurgerConstructor />
              )}
            </main>
          </TotalPriceContext.Provider>
        </DataContext.Provider>
      </div>
    </>
  );
}

export default App;
