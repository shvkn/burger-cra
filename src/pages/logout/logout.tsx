import React, { FC, useEffect } from 'react';
import * as authActions from 'services/actions/auth';
import { Redirect } from 'react-router-dom';
import { useAppDispatch } from 'services/slices';

const LogoutPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  return <Redirect to={'/'} />;
};

export default LogoutPage;
