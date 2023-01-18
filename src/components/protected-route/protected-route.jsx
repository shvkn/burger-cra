import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import authActions from 'services/actions/auth';
import authSelectors from 'services/selectors/auth';

function ProtectedRoute({ children, component, nonAuthOnly = false, ...rest }) {
  const isAuthorized = useSelector(authSelectors.selectIsAuthorized);
  const isAuthLoading = useSelector(authSelectors.selectIsLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.getUser());
  }, [dispatch]);

  return isAuthLoading ? (
    <p>Loading...</p>
  ) : (
    <Route
      {...rest}
      render={({ location }) => {
        if (isAuthorized) {
          return nonAuthOnly ? (
            <Redirect to={location.state?.from ?? '/'} />
          ) : (
            children ?? React.createElement(component)
          );
        } else {
          return nonAuthOnly ? (
            children ?? React.createElement(component)
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          );
        }
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
