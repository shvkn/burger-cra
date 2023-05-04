import {
  createSelector,
  createSlice,
  isAllOf,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';

import {
  getUser,
  login,
  logout,
  patchUser,
  refreshTokens,
  register,
  resetPassword,
} from './actions';
import { hasUser } from './lib';

const initialState: {
  user: TUser | undefined;
  isAuthorized: boolean;
  status: 'idle' | 'loading' | 'failed';
  error: FetchBaseQueryError | SerializedError | undefined;
} = {
  user: undefined,
  isAuthorized: false,
  status: 'idle',
  error: undefined,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, () => initialState)
      .addCase(refreshTokens.rejected, () => initialState)
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(
        isPending(login, register, logout, getUser, patchUser, resetPassword, refreshTokens),
        (state) => {
          state.error = undefined;
          state.status = 'loading';
        }
      )
      .addMatcher(
        isRejected(login, register, logout, getUser, patchUser, resetPassword, refreshTokens),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
          state.isAuthorized = false;
          state.user = undefined;
        }
      )
      .addMatcher(
        isFulfilled(login, register, logout, getUser, patchUser, resetPassword, refreshTokens),
        (state) => {
          state.status = 'idle';
        }
      )
      .addMatcher(isAllOf(isFulfilled(login, getUser, patchUser), hasUser), (state, action) => {
        state.user = action.payload.user;
        state.isAuthorized = true;
      });
  },
});

export const { reducer } = authSlice;

const selectAuthSlice = (state: TRootState) => state.auth;
const selectUser = (state: TRootState) => selectAuthSlice(state).user;
const selectIsAuthorized = (state: TRootState) => selectAuthSlice(state).isAuthorized;
const selectStatus = (state: TRootState) => selectAuthSlice(state).status;
const selectError = (state: TRootState) => selectAuthSlice(state).error;

const selectIsLoading = createSelector(selectStatus, (status) => status === 'loading');
// TODO Костыль
const selectIsSucceeded = createSelector(selectStatus, (status) => status === 'loading');
const selectIsFailed = createSelector(selectStatus, (status) => status === 'failed');

export const selectors = {
  selectError,
  selectIsAuthorized,
  selectIsFailed,
  selectIsLoading,
  selectIsSucceeded,
  selectUser,
};

export const useAuth = () => {
  const user = useSelector(selectUser);
  const isAuthorized = useSelector(selectIsAuthorized);
  const isFailed = useSelector(selectIsFailed);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  return {
    user,
    isAuthorized,
    isFailed,
    isLoading,
    error,
  };
};
