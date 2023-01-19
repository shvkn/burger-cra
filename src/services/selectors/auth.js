import { createSelector } from '@reduxjs/toolkit';
import { AuthStatuses } from 'utils/constants';

const selectAuth = (state) => state.auth;

const selectUser = (state) => state.auth.user;

const selectIsAuthorized = createSelector(selectAuth, (auth) => {
  return auth.status === AuthStatuses.AUTHORIZED;
});

const selectIsLoading = createSelector(selectAuth, (auth) => {
  return auth.status === AuthStatuses.LOADING;
});

const authSelectors = {
  selectIsAuthorized,
  selectIsLoading,
  selectUser,
};

export default authSelectors;
