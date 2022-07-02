// import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../services/actions/user';

export const ProtectedRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((store) => store.user);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    // console.log('ProtectedRoute init()');
    await dispatch(getUserData());
    setUserLoaded(true);
    
  };

  useEffect(() => {
    init();
    // console.log(user);
    // console.log('isUserLoaded ' + isUserLoaded);
    // console.log('isAuth: ' + isAuth);
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

// export const ProtectedRoute = ({ anonymous = false, isAuth, children }) => {
//   if (anonymous && isAuth) {
//     return <Navigate to='/' />;
//   }
//   if (!anonymous && !isAuth) {
//     return <Navigate to='/login' />;
//   }

//   return <>{children}</>;
// };
