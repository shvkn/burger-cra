import { deleteCookie, getCookie, setCookie } from 'utils/cookie';
import { CookieSerializeOptions } from 'cookie';
import { TKeySuccessFalse } from 'services/types';
import { PayloadAction as PA } from '@reduxjs/toolkit';
import { TAuthResponseBody, TBaseResponseBody, TOrderWsMessage } from 'services/types/response';

export type TAuthTokens = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
};
export const getToken = (name: keyof TAuthTokens): string | undefined => {
  return getCookie(name);
};

export const setToken = (
  name: keyof TAuthTokens,
  value: string | number | boolean,
  options: CookieSerializeOptions = {}
): void => {
  setCookie(name, value, options);
};
export const getRefreshToken = () => getToken('refreshToken');
export const getAccessToken = () => getToken('accessToken');

export const deleteToken = (name: keyof TAuthTokens): void => {
  deleteCookie(name);
};

export const setRefreshToken = (value: string): void => {
  setToken('refreshToken', value);
};

export const setAccessToken = (value: string) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 20 * 60 * 1000);
  setToken('accessToken', value, { expires });
};

export const dropRefreshToken = () => {
  deleteToken('refreshToken');
};

export const dropAccessToken = () => {
  deleteToken('accessToken');
};

/*export const getAuthTokens = (): TAuthTokens => ({
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),
});*/

export const dropAuthTokens = (): void => {
  dropAccessToken();
  dropRefreshToken();
};

export const extractToken = (authHeader: string): string | undefined => {
  try {
    return authHeader.split('Bearer ')[1];
  } catch (e) {
    return undefined;
  }
};

export const processAuthResponse = (response: TAuthResponseBody) => {
  const { success, accessToken, refreshToken } = response;
  if (success && !!accessToken && !!refreshToken) {
    const extractedToken = extractToken(accessToken);
    if (!!extractedToken) {
      setAccessToken(extractedToken);
    }
    setRefreshToken(refreshToken);
  } else {
    dropAuthTokens();
  }
  return Promise.resolve(response);
};

/*export const getOrRefreshAuthTokens = async ({ forceRefresh = false } = {}) => {
  try {
    const refreshTokens = (refreshToken: string) => {
      return refreshTokenRequest(refreshToken).then(processAuthResponse);
    };
    const { accessToken, refreshToken } = getAuthTokens();
    if (!accessToken || forceRefresh) {
      return !!refreshToken ? refreshTokens(refreshToken).then(() => getAuthTokens()) : {};
    }
    return { accessToken, refreshToken };
  } catch (e) {
    console.log(e);
    throw e;
  }
};*/

export const processAuthorizedRequest = async (request: any, ...args: any[]) => {
  try {
    /*const { accessToken } = await getOrRefreshAuthTokens();
    if (!accessToken) {
      return { success: false, message: 'You should be authorized' };
    }
    const response = await request(accessToken, ...payload);
    if (response.success) {
      return response;
    }
    const { accessToken: newAccessToken } = await getOrRefreshAuthTokens({ forceRefresh: true });
    return request(newAccessToken, ...payload);*/
    return request(args);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const processResponse = async <T>(response: Response): Promise<T> => {
  return response.json();
  // if (response.ok) return response.json();
  // throw new Error(`Ошибка: ${response.status}`);
};

export const request = <T>(input: RequestInfo | URL, init: RequestInit): Promise<T> => {
  return fetch(input, init).then(processResponse<T>);
};
/*
const processResponse = async (response: Response) => {
  if (response.ok) return response.json();
  throw new Error(`Ошибка: ${response.status}`);
};

export const request = (input: RequestInfo | URL, init: RequestInit) => {
  return fetch(input, init).then(processResponse);
};*/

/*export const callRequestWithAccessToken = async <
  P extends Awaited<TOrderResponseBody | TAuthResponseBody>,
  T
>(
  request: T extends (f: string, ...args: any[]) => Promise<P> ? T : never,
  ...params: T extends (f: string, ...args: infer R) => Promise<P> ? R : never
): Promise<P> => {
  const accessToken = getAccessToken();
  if (!!accessToken) {
    const response = await request.call(null, accessToken, ...params);
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
        return request.call(null, newAccessToken, ...params);
      }
    }
    return response;
  }
  const responseBody: TBaseResponseBody = {
    success: false,
    message: 'Refresh token is missed',
  };
  return responseBody;
};*/

export const hasAuthTokens = (): boolean => {
  return !!getAccessToken() || !!getRefreshToken();
};
export const hasError = (
  a: PA<TBaseResponseBody>
): a is PA<TBaseResponseBody & TKeySuccessFalse> => {
  return !a.payload?.success;
};
export const hasOrders = (a: PA<TOrderWsMessage>): a is PA<Required<TOrderWsMessage>> => {
  return !!a.payload?.orders;
};
