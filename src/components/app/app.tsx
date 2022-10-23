import { FC, useEffect } from 'react';
import { useDispatch } from '../../hooks/hooks';
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
import { getUserDataThunk } from '../../services/actions/user';
import { getCookie } from '../../utils/utils';
import { ProtectedRoute } from '../protected-route';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { AppHeader } from '../app-header/app-header';
import { OrderInfo } from '../order-info';
import { getIngredientsThunk } from '../../services/actions/ingredients';
import { Location } from 'history';
import styles from './app.module.css';
import { getFormattedOrderNumber } from '../../utils/order-number-format';

const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // проверим, есть ли accessToken
  const init = () => {
    if (getCookie('accessToken')) {
      dispatch(getUserDataThunk());
    }
  };

  useEffect(() => {
    init();
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  const closeAllModals = () => {
    history.goBack();
  };

  const location = useLocation<{ background: Location }>();

  const background = location.state && location.state.background;

  const orderNumber = useRouteMatch<{ id: string }>(['/feed/:id', '/profile/orders/:id'])
    ?.params?.id;

  const formattedOrderNumber = orderNumber && getFormattedOrderNumber(orderNumber);

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
            <p className={`text text_type_digits-default`}>{`#${formattedOrderNumber}`}</p>
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
              title={`#${formattedOrderNumber}`}
              onClose={closeAllModals}
            >
              <OrderInfo />
            </Modal>
          </Route>
          <ProtectedRoute path='/profile/orders/:id' exact>
            <Modal
              title={`#${getFormattedOrderNumber(orderNumber!)}`}
              onClose={closeAllModals}
            >
              <OrderInfo />
            </Modal>
          </ProtectedRoute>
        </>
      )}
    </>
  );
};

export default App;
