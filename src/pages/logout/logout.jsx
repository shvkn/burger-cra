import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as authActions from 'services/actions/auth';
import { Redirect } from 'react-router-dom';

function LogoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  return <Redirect to={'/'} />;
}

export default LogoutPage;
