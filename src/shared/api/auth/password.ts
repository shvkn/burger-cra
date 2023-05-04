import { NORMA_API } from 'shared/config';
import { request } from 'shared/lib';

const BASE_URL = `${NORMA_API}/password-reset`;

export const requestResetCode = async (email: string) => {
  try {
    return request<TBaseResponseBody>(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  } catch (e) {
    throw e;
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    return request<TBaseResponseBody>(`${BASE_URL}/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });
  } catch (e) {
    throw e;
  }
};
