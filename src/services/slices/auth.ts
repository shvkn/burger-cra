import {
  createSlice,
  isAllOf,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction as PA,
} from '@reduxjs/toolkit';
import { getUser, login, logout, patchUser, register, resetPassword } from 'services/actions/auth';
import { hasError } from 'utils/utils';

const initialState: TAuthSlice = {
  user: null,
  isAuthorized: false,
  status: 'idle',
  error: {},
};

const isPendingAction = isPending(login, register, logout, getUser, patchUser, resetPassword);
const isFulfilledAction = isFulfilled(login, register, logout, getUser, patchUser, resetPassword);
const isRejectedAction = isRejected(login, register, logout, getUser, patchUser, resetPassword);

const hasUser = (a: PA<TUserResponseBody>): a is PA<Required<TUserResponseBody>> => {
  return !!a.payload?.user;
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
        state.error = {};
        state.status = 'loading';
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error;
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.status = 'succeeded';
      })
      .addMatcher(isAllOf(isFulfilledAction, hasError), (state, action) => {
        state.error.message = action.payload.message;
        state.isAuthorized = false;
        state.user = null;
      })
      .addMatcher(isAllOf(isFulfilledAction, hasUser), (state, action) => {
        state.user = action.payload.user;
        state.isAuthorized = true;
      });
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
