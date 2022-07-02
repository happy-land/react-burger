import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
} from '../../pages';
import { getUserData } from '../../services/actions/user';
import { getCookie } from '../../utils/utils';
import { ProtectedRoute } from '../protected-route';

function App() {
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const location = useLocation();
  const background = location.state?.background; // ?

  console.log('background: ' + background);

  // проверим, есть ли accessToken
  const init = () => {
    console.log('App init()');
    if (getCookie('accessToken')) {
      dispatch(getUserData());
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    // <Router>
    <Switch>
      <Route path='/' exact={true}>
        <HomePage />
      </Route>
      <Route path='/login' exact={true}>
        <LoginPage />
      </Route>
      <Route path='/register' exact={true}>
        <RegisterPage />
      </Route>
      <Route path='/forgot-password' exact={true}>
        <ForgotPasswordPage />
      </Route>
      <Route path='/reset-password' exact={true}>
        <ResetPasswordPage />
      </Route>
      <ProtectedRoute path='/profile' exact={true}>
        <ProfilePage />
      </ProtectedRoute>
      <Route path='/ingredients/:id'>
        <IngredientPage />
      </Route>
    </Switch>
    // </Router>
  );
}

export default App;
