import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as authActions from 'services/actions/auth';
import { useHistory } from 'react-router-dom';

function LogoutPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const logout = () => {
      dispatch(authActions.logout())
        .unwrap()
        .finally(() => {
          history.replace({ pathname: '/' });
        });
    };
    logout();
  });

  return <></>;
}

export default LogoutPage;
