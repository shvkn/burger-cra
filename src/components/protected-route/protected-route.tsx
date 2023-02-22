import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import authSelectors from 'services/selectors/auth';
import LoadingCurtain from 'components/loading-curtain/loading-curtain';
import * as authActions from 'services/actions/auth';
import { hasAuthTokens } from 'utils/utils';
import { RouteProps } from 'react-router';
import { useAppDispatch, useAppHistory, useAppSelector } from 'services/slices';

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
  const canBeAuthorized = hasAuthTokens();

  const authOnly = !nonAuthOnly;

  if (!canBeAuthorized) {
    dispatch(authActions.logout());
  } else {
    if (!isAuthError) {
      !isAuthorized && !isAuthLoading && dispatch(authActions.getUser());
    }
  }

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
