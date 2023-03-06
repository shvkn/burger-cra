import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from 'shared/api';
import { dropAuthTokens, getAccessToken, getRefreshToken } from 'shared/lib';

import {
  callRequestWithAccessToken,
  hasAccessToken,
  hasRefreshToken,
  processAuthResponse,
} from './lib';

export const login = createAsyncThunk<TAuthResponseBody, TLoginParams, TAsyncThunkConfig>(
  'auth/login',
  async ({ email, password }: TLoginParams, { rejectWithValue }) =>
    authApi
      .login(email, password)
      .then(processAuthResponse)
      .catch((e) => rejectWithValue(e))
);

export const register = createAsyncThunk<TAuthResponseBody, TRegisterParams, TAsyncThunkConfig>(
  'auth/register',
  async ({ name, email, password }: TRegisterParams, { rejectWithValue }) =>
    authApi.registerNewUser(name, email, password).catch((e) => rejectWithValue(e))
);

export const logout = createAsyncThunk<TBaseResponseBody, void, TAsyncThunkConfig>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    return authApi
      .logout(getRefreshToken() as string)
      .catch((e) => rejectWithValue(e))
      .finally(() => dropAuthTokens());
  },
  { condition: () => hasRefreshToken() }
);

export const resetPassword = createAsyncThunk<
  TBaseResponseBody,
  TResetPasswordParams,
  TAsyncThunkConfig
>('auth/reset-password', ({ token, password }: TResetPasswordParams, { rejectWithValue }) =>
  authApi.resetPassword(token, password).catch((e) => rejectWithValue(e))
);

export const getResetCode = createAsyncThunk<
  TBaseResponseBody,
  TGetResetCodeParams,
  TAsyncThunkConfig
>('auth/get-reset-code', async ({ email }: TGetResetCodeParams, { rejectWithValue }) =>
  authApi.requestResetCode(email).catch((e) => rejectWithValue(e))
);

export const refreshTokens = createAsyncThunk<TAuthResponseBody, string, TAsyncThunkConfig>(
  'auth/refresh',
  async (refreshToken: string, { rejectWithValue }) => {
    dropAuthTokens();
    return authApi
      .refreshTokens(refreshToken)
      .then(processAuthResponse)
      .catch((e) => rejectWithValue(e));
  }
);

export const getUser = createAsyncThunk<TUserResponseBody, void, TAsyncThunkConfig>(
  'auth/get-user',
  async (_, { dispatch }) =>
    callRequestWithAccessToken({
      request: authApi.getUser,
      accessTokenGetterFn: getAccessToken,
      refreshTokenGetterFn: getRefreshToken,
      dispatch,
      refreshTokensThunkAction: refreshTokens,
    }),
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (
        auth.status === 'loading' ||
        (!auth.isAuthorized && !hasAccessToken() && !hasRefreshToken())
      ) {
        return false;
      }
    },
  }
);

export const patchUser = createAsyncThunk<TUserResponseBody, TPatchUserData, TAsyncThunkConfig>(
  'auth/patch-user',
  async (data: TPatchUserData, { dispatch }) =>
    callRequestWithAccessToken({
      request: authApi.patchUser,
      params: [data],
      accessTokenGetterFn: getAccessToken,
      refreshTokenGetterFn: getRefreshToken,
      dispatch,
      refreshTokensThunkAction: refreshTokens,
    })
);
