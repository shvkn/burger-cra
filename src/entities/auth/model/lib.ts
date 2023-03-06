import { AsyncThunk, Dispatch } from '@reduxjs/toolkit';

import {
  dropAuthTokens,
  extractToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from 'shared/lib';

export const processAuthResponse = (response: TAuthResponseBody) => {
  dropAuthTokens();
  const { success, accessToken, refreshToken } = response;
  if (success && !!accessToken && !!refreshToken) {
    const extractedToken = extractToken(accessToken);
    if (!!extractedToken) {
      setAccessToken(extractedToken);
      setRefreshToken(refreshToken);
    }
  }
  return Promise.resolve(response);
};
export const callRequestWithAccessToken = async <
  P extends TBaseResponseBody,
  T extends (token: string, ...rest: any[]) => Promise<P>
>({
  request,
  params,
  accessTokenGetterFn,
  refreshTokenGetterFn,
  dispatch,
  refreshTokensThunkAction,
}: {
  request: T;
  params?: T extends (token: string, ...rest: infer R) => any ? R : never;
  accessTokenGetterFn: () => string | undefined;
  refreshTokenGetterFn: () => string | undefined;
  dispatch: Dispatch<any>;
  refreshTokensThunkAction: AsyncThunk<TAuthResponseBody, string, TAsyncThunkConfig>;
}) => {
  const callRequest = async (accessToken: string) =>
    request.call(null, accessToken, ...(params || []));

  const refreshTokensAndCallRequest = async () => {
    const refreshToken = refreshTokenGetterFn();
    if (!!refreshToken) {
      await dispatch(refreshTokensThunkAction(refreshToken));
      const accessToken = accessTokenGetterFn();
      if (!!accessToken) {
        return callRequest(accessToken);
      }
    }
    return Promise.reject<TAuthResponseBody>();
  };
  try {
    const accessToken = accessTokenGetterFn();
    if (!!accessToken) {
      const response = await callRequest(accessToken);
      if (response.success) {
        return response;
      }
    }
    return refreshTokensAndCallRequest();
  } catch (e) {
    return refreshTokensAndCallRequest();
  }
};
export const hasRefreshToken = () => !!getRefreshToken();
export const hasAccessToken = () => !!getAccessToken();
