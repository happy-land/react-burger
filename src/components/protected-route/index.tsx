import { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { getCookie } from '../../utils/utils';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {

  const isAuthorized = getCookie('accessToken');

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
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
