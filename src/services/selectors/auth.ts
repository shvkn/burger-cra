import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from 'services/types';

const selectAuth = (state: TRootState) => state.auth;

const selectUser = (state: TRootState) => state.auth.user;

const selectIsAuthorized = createSelector(selectAuth, (auth) => {
  return auth.isAuthorized === true;
});

const selectIsLoading = createSelector(selectAuth, (auth) => {
  return auth.status === 'loading';
});

const selectError = (state: TRootState) => state.auth.error;

const authSelectors = {
  selectIsAuthorized,
  selectIsLoading,
  selectUser,
  selectError,
};

export default authSelectors;
