import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFound404Page,
} from '../../pages';
import { Modal } from '../modal/modal';
import { getUserData } from '../../services/actions/user';
import { closeIngredientModal } from '../../services/actions/ingredientDetails';
import { closeOrderModal } from '../../services/actions/order';
import { getCookie } from '../../utils/utils';
import { ProtectedRoute } from '../protected-route';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { AppHeader } from '../app-header/app-header';

import styles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { isIngredientDetailsOpened, item } = useSelector(
    (store) => store.ingredientDetails
  );

  // проверим, есть ли accessToken
  const init = async () => {
    if (getCookie('accessToken')) {
      await dispatch(getUserData());
    }
  };

  useEffect(() => {
    init();
  }, [dispatch]);

  const closeAllModals = () => {
    // dispatch(closeIngredientModal());
    // dispatch(closeOrderModal());
    history.goBack();
  };

  const background = location.state && location.state.background;

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
        <ProtectedRoute path='/profile' exact>
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
        <Route path='/ingredients/:id' exact>
          <Modal title='Детали ингредиента' onClose={closeAllModals}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;
