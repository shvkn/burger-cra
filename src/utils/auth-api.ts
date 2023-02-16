import { NORMA_API } from 'utils/constants';
import { request } from 'utils/utils';
import {
  TAuthResponseBody,
  TBaseResponseBody,
  TPatchUserData,
  TUserResponseBody,
} from 'services/types';

export const registerUserRequest = async (name: string, email: string, password: string) => {
  try {
    return request<TAuthResponseBody>(`${NORMA_API}/auth/register`, {
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

export const loginRequest = async (email: string, password: string) => {
  try {
    return request<TAuthResponseBody>(`${NORMA_API}/auth/login`, {
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

export const logoutRequest = async (refreshToken: string) => {
  try {
    return request<TBaseResponseBody>(`${NORMA_API}/auth/logout`, {
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
export const refreshTokenRequest = async (refreshToken: string) => {
  try {
    return request<TAuthResponseBody>(`${NORMA_API}/auth/token`, {
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

export const getUserRequest = async (accessToken: string) => {
  try {
    return request<TUserResponseBody>(`${NORMA_API}/auth/user`, {
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

export const patchUserRequest = async (accessToken: string, data: TPatchUserData) => {
  try {
    return request<TUserResponseBody>(`${NORMA_API}/auth/user`, {
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
export const getResetCodeRequest = async (email: string) => {
  try {
    return request<TBaseResponseBody>(`${NORMA_API}/password-reset`, {
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

export const resetPasswordRequest = async (token: string, password: string) => {
  try {
    return request<TBaseResponseBody>(`${NORMA_API}/password-reset/reset`, {
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
