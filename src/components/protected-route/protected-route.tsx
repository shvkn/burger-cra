import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoadingCurtain } from 'shared/ui';
import { RouteProps } from 'react-router';
import useConstructor from 'hooks/use-constructor';
import { authModel } from 'entities/auth';
import { getAccessToken, getRefreshToken, useAppDispatch, useAppHistory } from 'shared/lib';

type TProtectedRouteProps = {
  nonAuthOnly?: boolean;
} & RouteProps;

const ProtectedRoute: React.FC<TProtectedRouteProps> = ({
  children,
  component,
  nonAuthOnly = false,
  ...rest
}) => {
  const { isAuthorized, isLoading: isAuthLoading, error } = authModel.useAuth();

  const dispatch = useAppDispatch();
  const { location } = useAppHistory();

  const authOnly = !nonAuthOnly;
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const hasAccessToken = !!accessToken;
  const hasRefreshToken = !!refreshToken;
  const hasAnyToken = hasAccessToken || hasAccessToken;
  const hasError = !!error;

  useConstructor(() => {
    if (error) {
      return;
    }
    if (!isAuthLoading && hasAnyToken) {
      dispatch(authModel.actions.getUser());
    }
  });

  useEffect(() => {
    if (!isAuthLoading) {
      if (hasError || (isAuthorized && !hasAnyToken)) {
        console.log(error);
        dispatch(authModel.actions.logout());
      } else if (!hasError && !hasAccessToken && hasRefreshToken) {
        dispatch(authModel.actions.getUser());
      }
    }
  });

  if (isAuthLoading && !isAuthorized) {
    return <LoadingCurtain />;
  }
  if (authOnly && !isAuthorized) {
    return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
  }
  if (nonAuthOnly && isAuthorized) {
    return <Redirect to={location.state?.from ?? '/'} />;
  }

  return children ? (
    <Route {...rest}>{children}</Route>
  ) : component ? (
    <Route {...rest} component={component} />
  ) : null;
};

export default ProtectedRoute;
