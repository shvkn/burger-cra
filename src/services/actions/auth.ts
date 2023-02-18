import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userOrdersWebsocketActions from 'services/actions/user-orders';
import {
  getResetCodeRequest,
  getUserRequest,
  loginRequest,
  logoutRequest,
  patchUserRequest,
  refreshTokenRequest,
  registerUserRequest,
  resetPasswordRequest,
} from 'utils/auth-api';

import { dropAuthTokens, getAccessToken, getRefreshToken, processAuthResponse } from 'utils/utils';
import {
  TGetResetCodeParams,
  TLoginParams,
  TPatchUserData,
  TRegisterParams,
  TResetPasswordParams,
} from 'services/types';
import { TBaseResponseBody } from 'services/types/response';

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

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  try {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      return logoutRequest(refreshToken).finally(() => {
        // TODO
        dispatch(userOrdersWebsocketActions.close());
        dropAuthTokens();
      });
    }
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
// TODO Вынести в абстракцию
export const getUser = createAsyncThunk('auth/get-user', async () => {
  try {
    // return callRequestWithAccessToken(getUserRequest);
    const accessToken = getAccessToken();
    if (!!accessToken) {
      const response = await getUserRequest(accessToken);
      if (response.success) {
        return response;
      }
    }
    const refreshToken = getRefreshToken() ?? '';
    if (!!refreshToken) {
      const response = await refreshTokenRequest(refreshToken);
      if (response.success) {
        await processAuthResponse(response);
        const newAccessToken = getAccessToken();
        if (!!newAccessToken) {
          return getUserRequest(newAccessToken);
        }
      }
      return response;
    }
    const responseBody: TBaseResponseBody = {
      success: false,
      message: 'Refresh token is missed',
    };
    return responseBody;
  } catch (e) {
    throw e;
  }
});
// TODO Вынести в абстракцию
export const patchUser = createAsyncThunk('auth/patch-user', async (data: TPatchUserData) => {
  try {
    const accessToken = getAccessToken();
    if (!!accessToken) {
      const response = await patchUserRequest(accessToken, data);
      if (response.success) {
        return response;
      }
    }
    const refreshToken = getRefreshToken() ?? '';
    if (!!refreshToken) {
      const response = await refreshTokenRequest(refreshToken);
      if (response.success) {
        await processAuthResponse(response);
        const newAccessToken = getAccessToken();
        if (!!newAccessToken) {
          return patchUserRequest(newAccessToken, data);
        }
      }
      return response;
    }
    const responseBody: TBaseResponseBody = {
      success: false,
      message: 'Refresh token is missed',
    };
    return responseBody;
    // return callRequestWithAccessToken(patchUserRequest, data);
  } catch (e) {
    throw e;
  }
});
