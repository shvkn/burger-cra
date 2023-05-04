import { AUTH_URL } from 'shared/api/auth/config';
import { request } from 'shared/lib';

const BASE_URL = `${AUTH_URL}`;

export const login = async (email: string, password: string) => {
  try {
    return request<TAuthResponseBody>(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  } catch (e) {
    throw e;
  }
};

export const logout = async (refreshToken: string) => {
  try {
    return request<TBaseResponseBody>(`${BASE_URL}/logout`, {
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
export const registerNewUser = async (name: string, email: string, password: string) => {
  try {
    return request<TAuthResponseBody>(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
  } catch (e) {
    throw e;
  }
};
