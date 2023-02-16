import { NORMA_API } from 'utils/constants';
import { request } from 'utils/utils';
import {
  TAuthResponseBody,
  TBaseResponseBody,
  TPatchUserData,
  TUserResponseBody,
} from 'services/types';

export const registerUserRequest = async (
  name: string,
  email: string,
  password: string
): Promise<TAuthResponseBody> => {
  try {
    return request(`${NORMA_API}/auth/register`, {
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

export const loginRequest = async (email: string, password: string): Promise<TAuthResponseBody> => {
  try {
    return request(`${NORMA_API}/auth/login`, {
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

export const logoutRequest = async (refreshToken: string): Promise<TBaseResponseBody> => {
  try {
    return request(`${NORMA_API}/auth/logout`, {
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

export const refreshTokenRequest = async (refreshToken: string): Promise<TAuthResponseBody> => {
  try {
    return request(`${NORMA_API}/auth/token`, {
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

export const getUserRequest = async (accessToken: string): Promise<TUserResponseBody> => {
  try {
    return request(`${NORMA_API}/auth/user`, {
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

export const patchUserRequest = async (
  accessToken: string,
  data: TPatchUserData
): Promise<TUserResponseBody> => {
  try {
    return request(`${NORMA_API}/auth/user`, {
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

export const getResetCodeRequest = async (email: string): Promise<TBaseResponseBody> => {
  try {
    return request(`${NORMA_API}/password-reset`, {
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

export const resetPasswordRequest = async (
  token: string,
  password: string
): Promise<TBaseResponseBody> => {
  try {
    return request(`${NORMA_API}/password-reset/reset`, {
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
