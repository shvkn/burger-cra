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

const processResponse = async <T>(response: Response): Promise<T> => {
  try {
    return response.json();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const request = <T>(input: RequestInfo | URL, init: RequestInit): Promise<T> => {
  return fetch(input, init).then(processResponse<T>);
};

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

export const groupBy = <T extends any>(arr: Array<T>, fn: (item: T) => any) => {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
};
