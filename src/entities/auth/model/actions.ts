import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from 'shared/api';
import {
  callRequestWithAccessToken,
  constructResponseBody,
  dropAuthTokens,
  extractToken,
  getAccessToken,
  getRefreshToken,
  processAuthResponse,
  setAccessToken,
  setRefreshToken,
} from 'shared/lib';

const isLoading = (state: TRootState) => state.auth.status === 'loading';
const isAuthorized = (state: TRootState) => state.auth.isAuthorized;

const preventIfAuthorized = <T>(arg: T, api: { getState: () => TRootState }): boolean => {
  const state = api.getState();
  return !(isLoading(state) || isAuthorized(state));
};

export const login = createAsyncThunk('auth/login', async ({ email, password }: TLoginParams) => {
  try {
    return authApi.login(email, password).then(processAuthResponse);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: TRegisterParams) => {
    try {
      return authApi.registerNewUser(name, email, password).then(processAuthResponse);
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
      return authApi.logout(refreshToken);
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
      return authApi.resetPassword(token, password);
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
      return authApi.requestResetCode(email);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const refreshTokens = createAsyncThunk<
  Promise<TAuthResponseBody>,
  string,
  { state: TRootState }
>('auth/refresh', async (refreshToken: string) => {
  try {
    dropAuthTokens();
    const response = await authApi.refreshTokens(refreshToken);
    if (response.success && !!response.accessToken && !!response.refreshToken) {
      const refreshToken = response.refreshToken;
      const accessToken = extractToken(response.accessToken);
      if (!!accessToken && !!refreshToken) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
      }
    }
    return response;
  } catch (e) {
    console.log(e);
    dropAuthTokens();
    return Promise.reject<TAuthResponseBody>();
  }
});

export const getUser = createAsyncThunk<TUserResponseBody, void, { state: TRootState }>(
  'auth/get-user',
  async (_, { dispatch }) => {
    try {
      return callRequestWithAccessToken({
        request: authApi.getUser,
        accessTokenGetterFn: getAccessToken,
        refreshTokenGetterFn: getRefreshToken,
        dispatch,
        refreshTokensThunkAction: refreshTokens,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  /*{
    condition: (_, { getState }) => {
      const state = getState();
      const accessToken = getAccessToken();
      const refreshToken = getAccessToken();
      if (isLoading(state as TRootState) || (!accessToken && !refreshToken)) {
        return false;
      }
    },
  }*/
);

export const patchUser = createAsyncThunk<
  Promise<TUserResponseBody>,
  TPatchUserData,
  { state: TRootState }
>('auth/patch-user', async (data: TPatchUserData, { dispatch }) => {
  try {
    return callRequestWithAccessToken({
      request: authApi.patchUser,
      params: [data],
      accessTokenGetterFn: getAccessToken,
      refreshTokenGetterFn: getRefreshToken,
      dispatch,
      refreshTokensThunkAction: refreshTokens,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
});
