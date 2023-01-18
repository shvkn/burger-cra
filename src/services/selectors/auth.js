import { createSelector } from '@reduxjs/toolkit';
import { AuthStatuses } from 'utils/constants';

const authSlice = (state) => state.auth;

const user = createSelector(authSlice, (auth) => {
  return auth.user;
});

const isAuthorized = createSelector(authSlice, (auth) => {
  return auth.status === AuthStatuses.AUTHORIZED;
});

const isLoading = createSelector(authSlice, (auth) => {
  return auth.status === AuthStatuses.LOADING;
});

const authSelectors = {
  isAuthorized,
  isLoading,
  user,
};

export default authSelectors;
