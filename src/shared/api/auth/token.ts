import { request } from 'shared/lib';

import { AUTH_URL } from './config';

const BASE_URL = `${AUTH_URL}/token`;

export const refreshTokens = async (refreshToken: string) => {
  try {
    return request<TAuthResponseBody>(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });
  } catch (e) {
    throw e;
  }
};
