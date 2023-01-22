import { createSelector } from '@reduxjs/toolkit';

const selectAuth = (state) => state.auth;

const selectUser = (state) => state.auth.user;

const selectIsAuthorized = createSelector(selectAuth, (auth) => {
  return auth.isAuthorized === true;
});

const selectIsLoading = createSelector(selectAuth, (auth) => {
  return auth.status === 'loading';
});

const selectError = (state) => state.auth.error;

const authSelectors = {
  selectIsAuthorized,
  selectIsLoading,
  selectUser,
  selectError,
};

export default authSelectors;
