import React, { FC, useEffect } from 'react';
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
  const dispatch = useAppDispatch();
  const { location } = useAppHistory();
  const authOnly = !nonAuthOnly;

  useEffect(() => {
    const canBeAuthorized = hasAuthTokens();
    if (!isAuthorized && !isAuthLoading && canBeAuthorized) {
      dispatch(authActions.getUser());
    }
  }, [isAuthorized, dispatch, isAuthLoading]);

  return isAuthLoading && !isAuthorized ? (
    <LoadingCurtain />
  ) : authOnly && !isAuthorized ? (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  ) : nonAuthOnly && isAuthorized ? (
    <Redirect to={location.state.from ?? '/'} />
  ) : children ? (
    <Route {...rest}>{children}</Route>
  ) : component ? (
    <Route {...rest} component={component} />
  ) : null;
};

export default ProtectedRoute;
