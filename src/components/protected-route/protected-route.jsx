import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from 'services/actions/auth';
import authSelectors from 'services/selectors/auth';
import LoadingCurtain from '../loading-curtain/loading-curtain';

function ProtectedRoute({ children, component, nonAuthOnly = false, ...rest }) {
  const isAuthorized = useSelector(authSelectors.selectIsAuthorized);
  const isAuthLoading = useSelector(authSelectors.selectIsLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.getUser());
  }, [dispatch]);

  return isAuthLoading ? (
    <LoadingCurtain />
  ) : (
    <Route
      {...rest}
      render={({ location }) => {
        if ((nonAuthOnly && !isAuthorized) || (!nonAuthOnly && isAuthorized)) {
          return children ?? React.createElement(component);
        }
        if (!nonAuthOnly && !isAuthorized) {
          return <Redirect to={'/login'} />;
        }
        return <Redirect to={location.state?.from ?? '/'} />;
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  nonAuthOnly: PropTypes.bool,
  component: PropTypes.elementType,
};
export default ProtectedRoute;
