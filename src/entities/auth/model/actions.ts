import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from 'shared/api';
import {
  callRequestWithAccessToken,
  constructResponseBody,
  dropAuthTokens,
  getRefreshToken,
  processAuthResponse,
} from 'utils/utils';

export const login = createAsyncThunk('auth/login', async ({ email, password }: TLoginParams) => {
  try {
    return authApi.auth.login(email, password).then(processAuthResponse);
  } catch (e) {
    console.log(e);
    throw e;
  }
});
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: TRegisterParams) => {
    try {
      return authApi.auth.registerNewUser(name, email, password).then(processAuthResponse);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const refreshToken = getRefreshToken();
    dropAuthTokens();
    if (refreshToken) {
      return authApi.auth.logout(refreshToken);
    }
    return constructResponseBody({
      success: true,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  ({ token, password }: TResetPasswordParams) => {
    try {
      return authApi.password.resetPassword(token, password);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
export const getResetCode = createAsyncThunk(
  'auth/get-reset-code',
  ({ email }: TGetResetCodeParams) => {
    try {
      return authApi.password.requestResetCode(email);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const getUser = createAsyncThunk('auth/get-user', async () => {
  try {
    return callRequestWithAccessToken(authApi.user.getUser);
  } catch (e) {
    throw e;
  }
});

export const patchUser = createAsyncThunk('auth/patch-user', async (data: TPatchUserData) => {
  try {
    return callRequestWithAccessToken(authApi.user.patchUser, data);
  } catch (e) {
    throw e;
  }
});
