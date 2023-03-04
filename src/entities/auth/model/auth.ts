import {
  createSelector,
  createSlice,
  isAllOf,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { getUser, login, logout, patchUser, register, resetPassword } from './actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const isPendingAction = isPending(login, register, logout, getUser, patchUser, resetPassword);
const isRejectedAction = isRejected(login, register, logout, getUser, patchUser, resetPassword);
const isFulfilledAction = isFulfilled(login, register, logout, getUser, patchUser, resetPassword);

export const hasError = (
  action: PayloadAction<TBaseResponseBody>
): action is PayloadAction<TBaseResponseBody & { success: true }> => {
  return !action.payload?.success;
};

const hasUser = (
  action: PayloadAction<TUserResponseBody>
): action is PayloadAction<Required<TUserResponseBody>> => {
  return !!action.payload?.user;
};

const initialState: {
  user: TUser | undefined;
  isAuthorized: boolean;
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: FetchBaseQueryError | SerializedError | undefined;
} = {
  user: undefined,
  isAuthorized: false,
  status: 'idle',
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.pending, () => initialState)
      .addMatcher(isPendingAction, (state) => {
        state.error = undefined;
        state.status = 'loading';
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.status = 'succeeded';
      })
      .addMatcher(isAllOf(isFulfilledAction, hasError), (state, action) => {
        state.error = {
          message:
            action.payload?.message ??
            `Unknown error. Check ${action.meta.requestId} on ${action.meta.requestStatus}`,
        };
        state.isAuthorized = false;
        state.user = undefined;
      })
      .addMatcher(isAllOf(isFulfilledAction, hasUser), (state, action) => {
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
const selectIsSucceeded = createSelector(selectStatus, (status) => status === 'succeeded');
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
  const isSucceeded = useSelector(selectIsSucceeded);

  return {
    user,
    isAuthorized,
    isFailed,
    isLoading,
    isSucceeded,
  };
};
