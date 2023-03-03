import { createSelector } from '@reduxjs/toolkit';

const selectAuth = (state: TRootState) => state.auth;

const selectUser = (state: TRootState) => state.auth.user;

const selectIsAuthorized = (state: TRootState) => selectAuth(state).isAuthorized;

const selectIsLoading = createSelector(selectAuth, (auth) => {
  return auth.status === 'loading';
});
const selectError = (state: TRootState) => state.auth.error;
const selectIsError = createSelector(selectError, (error) => !!error.message);

const authSelectors = {
  selectIsAuthorized,
  selectIsLoading,
  selectIsError,
  selectUser,
  selectError,
};

export default authSelectors;
