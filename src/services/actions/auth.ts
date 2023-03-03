import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getResetCodeRequest,
  getUserRequest,
  loginRequest,
  logoutRequest,
  patchUserRequest,
  registerUserRequest,
  resetPasswordRequest,
} from 'utils/auth-api';

import {
  callRequestWithAccessToken,
  constructResponseBody,
  dropAuthTokens,
  getRefreshToken,
  processAuthResponse,
} from 'utils/utils';

export const login = createAsyncThunk('auth/login', async ({ email, password }: TLoginParams) => {
  try {
    return loginRequest(email, password).then(processAuthResponse);
  } catch (e) {
    console.log(e);
    throw e;
  }
});
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: TRegisterParams) => {
    try {
      return registerUserRequest(name, email, password).then(processAuthResponse);
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
      return logoutRequest(refreshToken);
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
      return resetPasswordRequest(token, password);
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
      return getResetCodeRequest(email);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const getUser = createAsyncThunk('auth/get-user', async () => {
  try {
    return callRequestWithAccessToken(getUserRequest);
  } catch (e) {
    throw e;
  }
});

export const patchUser = createAsyncThunk('auth/patch-user', async (data: TPatchUserData) => {
  try {
    return callRequestWithAccessToken(patchUserRequest, data);
  } catch (e) {
    throw e;
  }
});
