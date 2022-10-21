import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFound404Page,
  FeedPage,
} from '../../pages';
import { Modal } from '../modal/modal';
import { getUserData } from '../../services/actions/user';
import { getCookie } from '../../utils/utils';
import { ProtectedRoute } from '../protected-route';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { AppHeader } from '../app-header/app-header';

import { getIngredients } from '../../services/actions/ingredients';

import styles from './app.module.css';
import { getFormattedOrderNumber } from '../../utils/order-number-format';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // проверим, есть ли accessToken
  const init = async () => {
    if (getCookie('accessToken')) {
      await dispatch(getUserData());
    }
  };

  useEffect(() => {
    init();
    dispatch(getIngredients());
  }, [dispatch]);

  

  const closeAllModals = () => {
    history.goBack();
  };

  const background = location.state && location.state.background;

  const orderNumber = useRouteMatch(['/feed/:id', '/profile/orders/:id'])?.params?.id;

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path='/login' exact>
          <LoginPage />
        </Route>
        <Route path='/register' exact>
          <RegisterPage />
        </Route>
        <Route path='/forgot-password' exact>
          <ForgotPasswordPage />
        </Route>
        <Route path='/reset-password' exact>
          <ResetPasswordPage />
        </Route>
        <Route path='/feed' exact>
          <FeedPage />
        </Route>
        <Route path='/feed/:id' exact>
          <div className={styles.orderInfoContainer}>
            <p className={`text text_type_digits-default`}>{`#${getFormattedOrderNumber(
              orderNumber
            )}`}</p>
            <OrderInfo />
          </div>
        </Route>
        <ProtectedRoute path='/profile/'>
          <ProfilePage />
        </ProtectedRoute>

        <Route path='/ingredients/:id' exact>
          <div className={styles.detailsContainer}>
            <p className={`text text_type_main-large`}>Детали ингредиента</p>
            <IngredientDetails />
          </div>
        </Route>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route>
          <NotFound404Page />
        </Route>
      </Switch>
      {background && (
        <>
          <Route path='/ingredients/:id' exact>
            <Modal title='Детали ингредиента' onClose={closeAllModals}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path='/feed/:id' exact>
            <Modal
              title={`#${getFormattedOrderNumber(orderNumber)}`}
              onClose={closeAllModals}
            >
              <OrderInfo />
            </Modal>
          </Route>
          <ProtectedRoute path='/profile/orders/:id' exact>
            <Modal
              title={`#${getFormattedOrderNumber(orderNumber)}`}
              onClose={closeAllModals}
            >
              <OrderInfo />
            </Modal>
          </ProtectedRoute>
        </>
      )}
    </>
  );
}

export default App;
