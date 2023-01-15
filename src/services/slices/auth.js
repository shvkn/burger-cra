import { createSlice } from '@reduxjs/toolkit';
import { eraseCookie, extractToken, setCredentials } from '../../utils/utils';
import { getUser, login, logout, patchUser, registerUser } from '../actions/auth';
import { Tokens } from '../../utils/constants';

const initialState = { user: null, isLoading: false, error: null };

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload: { success, message, user, accessToken, refreshToken } }) => {
          if (success) {
            state.user = user;
            setCredentials(extractToken(accessToken), refreshToken);
          } else {
            console.log(message);
          }
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      .addCase(
        login.fulfilled,
        (state, { payload: { success, message, user, accessToken, refreshToken } }) => {
          if (success) {
            state.user = user;
            setCredentials(extractToken(accessToken), refreshToken);
          } else {
            console.log(message);
            if (message.trim().toLowerCase() === 'email or password are incorrect') {
              alert('Неверный логин или пароль');
            }
          }
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      .addCase(logout.fulfilled, (state, { payload: { message, success } }) => {
        if (success) {
          state.user = null;
          eraseCookie(Tokens.ACCESS_TOKEN);
          eraseCookie(Tokens.REFRESH_TOKEN);
        } else {
          console.log(message);
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      .addCase(getUser.fulfilled, (state, { payload: { user, success, message } }) => {
        if (success) {
          state.user = user;
        } else {
          console.log('message', message);
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(patchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(patchUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      .addCase(patchUser.fulfilled, (state, { payload: { user, success, message } }) => {
        if (success) {
          state.user = user;
        } else {
          console.log('message', message);
        }
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { actions } = auth;
export default auth.reducer;
