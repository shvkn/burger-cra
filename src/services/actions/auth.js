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
  getOrRefreshAccessToken,
  getRefreshToken,
  processAuthResponse,
} from 'utils/utils';

export const login = createAsyncThunk('auth/login', async (userdata) => {
  try {
    return loginRequest(userdata).then(processAuthResponse);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const register = createAsyncThunk('auth/register', async (userdata) => {
  try {
    return registerUserRequest(userdata).then(processAuthResponse);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  try {
    const refreshToken = getRefreshToken();
    dropAuthTokens();
    dispatch(userOrdersWebsocketActions.close());
    return logoutRequest(refreshToken);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const resetPassword = createAsyncThunk('auth/reset-password', (payload) => {
  try {
    return resetPasswordRequest(payload);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const getResetCode = createAsyncThunk('auth/get-reset-code', (payload) => {
  try {
    return getResetCodeRequest(payload);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const getUser = createAsyncThunk('auth/get-user', async (_, { dispatch }) => {
  try {
    const accessToken = await getOrRefreshAccessToken();
    if (!accessToken) {
      dispatch(userOrdersWebsocketActions.close());
      return { success: false, message: 'You should be authorized' };
    }
    const response = await getUserRequest(accessToken);
    if (response.success) {
      return response;
    }
    const newAccessToken = await getOrRefreshAccessToken(true);
    return getUserRequest(newAccessToken);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const patchUser = createAsyncThunk('auth/patch-user', async (userdata, { dispatch }) => {
  try {
    const accessToken = await getOrRefreshAccessToken();
    if (!accessToken) {
      dispatch(userOrdersWebsocketActions.close());
      return { success: false, message: 'You should be authorized' };
    }
    const response = await patchUserRequest(userdata, accessToken);
    if (response.success) {
      return response;
    }
    const newAccessToken = await getOrRefreshAccessToken(true);
    return patchUserRequest(userdata, newAccessToken);
  } catch (e) {
    console.log(e);
    throw e;
  }
});
