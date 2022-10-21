import { useEffect, useState } from 'react';

import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';

import { baseUrl } from '../../utils/constants';

import appStyles from './app.module.css';

function App() {
  const [ingredients, setIngredients] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false);

  // стейт выбранной карточки
  const [currentCardData, setCurrentCardData] = useState({});

  // Закрытие всех модалок
  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
  };

  // Обработка нажатия Esc
  const handleEscKeydown = (event) => {
    event.key === 'Escape' && closeAllModals();
  };

  // загрузка с сервера данных
  useEffect(() => {
    const getIngredients = async () => {
      setIngredients({ ...ingredients, isLoading: true, hasError: false });
      fetch(baseUrl)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
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
        <Modal
          title=''
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <OrderDetails />
        </Modal>
      )}
      {isIngredientDetailsOpened && (
        <Modal
          title='Детали ингредиента'
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <IngredientDetails data={currentCardData} />
        </Modal>
      )}
      <div className={appStyles.app}>
        <AppHeader />
        <main className={appStyles.container}>
          <BurgerIngredients
            data={ingredients.data}
            setIsIngredientDetailsOpened={setIsIngredientDetailsOpened}
            setCurrentCardData={setCurrentCardData}
          />
          <BurgerConstructor
            data={ingredients.data}
            setIsOrderDetailsOpened={setIsOrderDetailsOpened}
          />
        </main>
      </div>
    </>
  );
}

export default App;
