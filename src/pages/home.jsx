import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const background = location.state?.background; // ?

  const dispatch = useDispatch();
  // const { isIngredientDetailsOpened, item } = useSelector(
  //   (store) => store.ingredientDetails
  // );
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

      {/* {isIngredientDetailsOpened && (
        <Router>
          <Switch location={background || location}>
            <Route path='/ingredients/:id'>
              <IngredientDetails data={item} />
            </Route>
          </Switch>
        </Router>
      )}
      {isIngredientDetailsOpened && background && (
        <Router>
          <Switch location={background || location}>
            <Route path='/ingredients/:id'>
              <Modal title='Детали ингредиента' onClose={closeAllModals}>
                <IngredientDetails data={item} />
              </Modal>
            </Route>
          </Switch>
        </Router>
      )} */}

      {/* {isIngredientDetailsOpened && background && (
        <Route path='/ingredients/:id' exact={true}>
          <Modal title='Детали ингредиента' onClose={closeAllModals}>
            <IngredientDetails data={item} />
          </Modal>
        </Route>
      )} */}

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
