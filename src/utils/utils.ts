import { deleteCookie, getCookie, setCookie } from 'utils/cookie';
import { CookieSerializeOptions } from 'cookie';
import { TAuthTokens, TKeySuccessFalse } from 'services/types';
import { Dictionary, PayloadAction as PA } from '@reduxjs/toolkit';
import { TAuthResponseBody, TBaseResponseBody, TOrderWsMessage } from 'services/types/response';
import { refreshTokenRequest } from 'utils/auth-api';
import { Messages } from 'utils/constants';
import { TIngredient, TOrder } from 'services/types/data';

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

export const hasError = (
  a: PA<TBaseResponseBody>
): a is PA<TBaseResponseBody & TKeySuccessFalse> => {
  return !a.payload?.success;
};

export const hasOrders = (a: PA<TOrderWsMessage>): a is PA<Required<TOrderWsMessage>> => {
  return !!a.payload?.orders;
};

export const groupBy = <T extends any, K extends (item: T) => string>(
  arr: ReadonlyArray<T>,
  fn: K
): Record<ReturnType<K>, T[]> => {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
};

export const countBy = <T extends any>(arr: Array<T>, fn: (item: T) => any) => {
  return arr.reduce<Record<string, number>>((prev, curr) => {
    const groupKey = fn(curr);
    const count = prev[groupKey] || 0;
    return { ...prev, [groupKey]: count + 1 };
  }, {});
};

export const sumBy = <T>(arr: ReadonlyArray<T>, fn: (i: T) => number): number => {
  return arr.reduce((acc, cur) => acc + fn(cur), 0);
};

export const constructResponseBody = <T extends TBaseResponseBody>(
  params: T
): TBaseResponseBody => {
  return { ...params };
};

export const callRequestWithAccessToken = async <
  P extends TBaseResponseBody,
  T extends (token: string, ...rest: any[]) => Promise<P>
>(
  request: T,
  ...args: T extends (token: string, ...rest: infer R) => any ? R : never
) => {
  try {
    const accessToken = getAccessToken();
    if (!!accessToken) {
      const response = await request.call(null, accessToken, ...args);
      if (response.success) {
        return response;
      }
    }
    const refreshToken = getRefreshToken();
    if (!!refreshToken) {
      const response = await refreshTokenRequest(refreshToken);
      if (response.success) {
        await processAuthResponse(response);
        const newAccessToken = getAccessToken();
        if (!!newAccessToken) {
          return request.call(null, newAccessToken, ...args);
        }
      }
      return response;
    }
    return constructResponseBody<TBaseResponseBody>({
      success: false,
      message: Messages.INVALID_TOKEN,
    });
  } catch (e) {
    throw e;
  }
};
export const getChangedEntries = <
  T extends { [x: string]: any },
  K extends { [k in keyof T]: any }
>(
  originObj: T,
  comparableObj: K
) => {
  return Object.keys(originObj).reduce(
    (result, key) => ({
      ...result,
      ...(originObj[key] !== comparableObj[key] && { [key]: comparableObj[key] }),
    }),
    {}
  );
};

export const sortByKey = <T extends TIngredient, K extends keyof T>(
  key: K,
  value: T[K],
  order: 'asc' | 'desc' = 'desc'
) => {
  return (a: T, b: T) => {
    const t1 = a[key] === value ? 1 : 0;
    const t2 = b[key] === value ? 1 : 0;
    return order === 'desc' ? t2 - t1 : t1 - t2;
  };
};

export const mapIdsToEntities = <T>(
  ids: ReadonlyArray<string>,
  entities: Dictionary<T>
): Array<T> => {
  return ids.map((id) => entities[id]).filter((i): i is T => !!i);
};

export const getOrderIngredients = (
  order: TOrder,
  ingredientsEntities: Dictionary<TIngredient>
) => {
  try {
    const orderIngredients = mapIdsToEntities(order.ingredients, ingredientsEntities);
    const burger = groupBy(orderIngredients, (i) => {
      return i.type === 'bun' ? 'bun' : 'ingredients';
    });
    const bun = burger?.bun?.pop();
    const ingredients = burger?.ingredients;
    return !!bun
      ? !!ingredients?.length
        ? [bun, ...ingredients]
        : [bun]
      : !!ingredients?.length
      ? [...ingredients]
      : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getOrderTotalPrice = (order: TOrder, ingredientsEntities: Dictionary<TIngredient>) => {
  const orderIngredients = getOrderIngredients(order, ingredientsEntities);
  return sumBy(orderIngredients, (i) => {
    return i.type === 'bun' ? 2 * i.price : i.price;
  });
};
