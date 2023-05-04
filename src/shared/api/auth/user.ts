import { request } from 'shared/lib';

import { AUTH_URL } from './config';

const BASE_URL = `${AUTH_URL}/user`;

export const getUser = async (accessToken: string) => {
  try {
    return request<TUserResponseBody>(`${BASE_URL}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    throw e;
  }
};

export const patchUser = async (accessToken: string, data: TPatchUserData) => {
  try {
    return request<TUserResponseBody>(`${BASE_URL}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    throw e;
  }
};
