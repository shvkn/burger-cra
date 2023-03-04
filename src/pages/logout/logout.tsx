import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch } from 'services/slices';
import { authModel } from 'entities/auth';

const LogoutPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authModel.actions.logout());
  }, [dispatch]);

  return <Redirect to={'/'} />;
};

export default LogoutPage;
