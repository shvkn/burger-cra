import { createAsyncThunk } from '@reduxjs/toolkit';
import { close as closeUserOrdersWebsocket } from 'services/actions/user-orders';
import {
  getUserRequest,
  loginRequest,
  logoutRequest,
  patchUserRequest,
  registerUserRequest,
} from 'utils/auth-api';

import { getOrRefreshAccessToken, getRefreshToken } from 'utils/utils';

export const login = createAsyncThunk('auth/login', async (userdata) => {
  try {
    return await loginRequest(userdata);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const register = createAsyncThunk('auth/register', async (userdata) => {
  try {
    return registerUserRequest(userdata);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  try {
    const refreshToken = getRefreshToken();
    dispatch(closeUserOrdersWebsocket());
    return logoutRequest(refreshToken);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const getUser = createAsyncThunk('auth/get-user', async (_, { dispatch }) => {
  try {
    const accessToken = await getOrRefreshAccessToken();
    if (!accessToken) {
      dispatch(closeUserOrdersWebsocket());
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
      dispatch(closeUserOrdersWebsocket());
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
