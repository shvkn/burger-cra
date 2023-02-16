import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userOrdersWebsocketActions from 'services/actions/user-orders';
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
  dropAuthTokens,
  getRefreshToken,
  processAuthorizedRequest,
  processAuthResponse,
} from 'utils/utils';

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  try {
    return loginRequest(email, password).then(processAuthResponse);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const register = createAsyncThunk('auth/register', async ({ name, email, password }) => {
  try {
    return registerUserRequest(name, email, password).then(processAuthResponse);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  try {
    const refreshToken = getRefreshToken();
    return logoutRequest(refreshToken).finally(() => {
      dispatch(userOrdersWebsocketActions.close());
      dropAuthTokens();
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const resetPassword = createAsyncThunk('auth/reset-password', ({ token, password }) => {
  try {
    return resetPasswordRequest(token, password);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const getResetCode = createAsyncThunk('auth/get-reset-code', (email) => {
  try {
    return getResetCodeRequest(email);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const getUser = createAsyncThunk('auth/get-user', async () => {
  try {
    return processAuthorizedRequest(getUserRequest);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const patchUser = createAsyncThunk('auth/patch-user', async (userdata) => {
  try {
    return processAuthorizedRequest(patchUserRequest, userdata);
  } catch (e) {
    console.log(e);
    throw e;
  }
});
