import { createSlice, isAllOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { login, register, logout, getUser, patchUser } from 'services/actions/auth';

const initialState = {
  user: null,
  status: 'idle',
  isAuthorized: false,
  error: null,
};

const isFulfilledAction = isFulfilled(login, register, getUser, patchUser);
const isPendingAction = isPending(login, register, getUser, patchUser);
const isRejectedAction = isRejected(login, register, getUser, patchUser);

const hasMessage = (action) => !!action.payload?.message;
const hasSuccessFalse = (action) => action.payload?.success === false;
const hasUser = (action) => !!action.payload?.user;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isFulfilledAction, (state) => {
        state.status = 'succeeded';
      })
      .addMatcher(isPendingAction, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addMatcher(isAllOf(isFulfilledAction, hasSuccessFalse, hasMessage), (state, action) => {
        state.error = action.payload.message;
        state.isAuthorized = false;
      })
      .addMatcher(isAllOf(isFulfilledAction, hasUser), (state, action) => {
        state.user = action.payload.user;
        state.isAuthorized = true;
      })
      .addMatcher(isPending(logout), () => initialState);
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
