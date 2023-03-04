import { AUTH_URL } from './config';
import { request } from 'shared/lib';

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
