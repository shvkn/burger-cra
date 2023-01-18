import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { dropAuthTokens, extractToken, setAuthTokens } from 'utils/utils';
import { getUser, login, logout, patchUser, register } from 'services/actions/auth';
import { AuthStatuses } from 'utils/constants';

const initialState = {
  user: null,
  status: AuthStatuses.NOT_AUTHORIZED,
  error: null,
};
const isAnyActionsPending = isPending(getUser, login, logout, patchUser, register);
const isAuthActionsFulfilled = isFulfilled(login, logout, register);
const isAnyActionsRejected = isRejected(getUser, login, logout, patchUser, register);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state, action) => {
        const { message, success } = action.payload;
        if (success) {
          state.user = null;
        } else {
          state.error = message;
        }
        dropAuthTokens();
        state.status = AuthStatuses.NOT_AUTHORIZED;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const { success, user, message } = action.payload;
        if (success) {
          state.status = AuthStatuses.AUTHORIZED;
          state.user = user;
        } else {
          state.status = AuthStatuses.NOT_AUTHORIZED;
          state.user = null;
          state.error = message;
        }
      })
      .addMatcher(isAnyActionsPending, (state) => {
        state.status = AuthStatuses.LOADING;
        state.error = null;
      })
      .addMatcher(isAnyActionsRejected, (state, { error }) => {
        state.status = AuthStatuses.NOT_AUTHORIZED;
        state.error = error;
      })
      .addMatcher(isAuthActionsFulfilled, (state, action) => {
        const { success, message, user, accessToken, refreshToken } = action.payload;
        if (success) {
          state.status = AuthStatuses.AUTHORIZED;
          state.user = user;
          setAuthTokens({ accessToken: extractToken(accessToken), refreshToken });
        } else {
          state.status = AuthStatuses.NOT_AUTHORIZED;
          state.user = null;
          state.error = message;
        }
      });
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
