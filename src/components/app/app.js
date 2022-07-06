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
  IngredientPage,
} from '../../pages';
import { Modal } from '../modal/modal';
import { getUserData } from '../../services/actions/user';
import { closeIngredientModal } from '../../services/actions/ingredientDetails';
import { closeOrderModal } from '../../services/actions/order';
import { getCookie } from '../../utils/utils';
import { ProtectedRoute } from '../protected-route';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();

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
  }, []);

  const closeAllModals = () => {
    dispatch(closeIngredientModal());
    dispatch(closeOrderModal());
    history.replace({ pathname: '/' });
  };

  let background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route path='/forgot-password'>
          <ForgotPasswordPage />
        </Route>
        <Route path='/reset-password'>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path='/profile'>
          <ProfilePage />
        </ProtectedRoute>
        <Route path='/ingredients/:id' exact>
          <IngredientPage />
        </Route>
      </Switch>
      {background && isIngredientDetailsOpened && (
        <Route path='/ingredients/:id'>
          <Modal title='Детали ингредиента' onClose={closeAllModals}>
            <IngredientDetails data={item} />
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;
