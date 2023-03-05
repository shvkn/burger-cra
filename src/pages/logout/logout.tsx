import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { authModel } from 'entities/auth';

import { useAppDispatch } from 'shared/lib';

export const LogoutPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authModel.actions.logout());
  }, [dispatch]);

  return <Redirect to={'/'} />;
};
