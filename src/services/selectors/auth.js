import { createSelector } from '@reduxjs/toolkit';

const authSlice = (state) => state.auth;

const isAuthorized = createSelector(authSlice, (auth) => {
  return auth.user !== null;
});

const authSelectors = {
  isAuthorized,
};

export default authSelectors;
