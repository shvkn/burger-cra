import React, { FC, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import authSelectors from 'services/selectors/auth';
import LoadingCurtain from 'components/loading-curtain/loading-curtain';
import * as authActions from 'services/actions/auth';
import { getAccessToken, getRefreshToken } from 'utils/utils';
import { RouteProps } from 'react-router';
import { useAppDispatch, useAppHistory, useAppSelector } from 'services/slices';
import useConstructor from 'hooks/use-constructor';

type TProtectedRouteProps = {
  nonAuthOnly?: boolean;
} & RouteProps;

const ProtectedRoute: FC<TProtectedRouteProps> = ({
  children,
  component,
  nonAuthOnly = false,
  ...rest
}) => {
  const isAuthorized = useAppSelector(authSelectors.selectIsAuthorized);
  const isAuthLoading = useAppSelector(authSelectors.selectIsLoading);
  const isAuthError = useAppSelector(authSelectors.selectIsError);

  const dispatch = useAppDispatch();
  const { location } = useAppHistory();

  const authOnly = !nonAuthOnly;
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const hasAnyToken = !!accessToken || !!refreshToken;

  useConstructor(() => {
    if (!isAuthLoading && !isAuthError && hasAnyToken) {
      dispatch(authActions.getUser());
    }
  });

  useEffect(() => {
    if (!isAuthLoading) {
      if (isAuthError || (isAuthorized && !hasAnyToken)) {
        dispatch(authActions.logout());
      } else if (!accessToken && !!refreshToken) {
        dispatch(authActions.getUser());
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
