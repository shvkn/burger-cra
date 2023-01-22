import { createSlice, isAllOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { login, register, logout, getUser, patchUser, resetPassword } from 'services/actions/auth';

const initialState = {
  user: null,
  status: 'idle',
  isAuthorized: false,
  error: null,
};

const isPendingAction = isPending(login, register, logout, getUser, patchUser, resetPassword);
const isFulfilledAction = isFulfilled(login, register, logout, getUser, patchUser, resetPassword);
const isRejectedAction = isRejected(login, register, logout, getUser, patchUser, resetPassword);

const hasMessage = (action) => !!action.payload?.message;
const hasError = (action) => action.payload?.success === false;
const hasUser = (action) => !!action.payload?.user;

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
      .addMatcher(isFulfilledAction, (state) => {
        state.status = 'succeeded';
      })
      .addMatcher(isPendingAction, (state) => {
        state.error = null;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addMatcher(isAllOf(isFulfilledAction, hasError, hasMessage), (state, action) => {
        state.error = action.payload.message;
        state.isAuthorized = false;
      })
      .addMatcher(isAllOf(isFulfilledAction, hasUser), (state, action) => {
        state.user = action.payload.user;
        state.isAuthorized = true;
      });
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
