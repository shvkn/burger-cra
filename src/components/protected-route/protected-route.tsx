import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import LoadingCurtain from 'components/loading-curtain/loading-curtain';
import { getAccessToken, getRefreshToken } from 'utils/utils';
import { RouteProps } from 'react-router';
import { useAppDispatch, useAppHistory } from 'services/slices';
import useConstructor from 'hooks/use-constructor';
import { authModel } from 'entities/auth';

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
  const hasAnyToken = !!accessToken || !!refreshToken;

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
      if (error || (isAuthorized && !hasAnyToken)) {
        dispatch(authModel.actions.logout());
      } else if (!accessToken && !!refreshToken) {
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
