import { NORMA_API } from 'utils/constants';
import { request } from 'utils/utils';
import {
  TLoginCredentials,
  TPatchUserData,
  TRegisterUserData,
  TResetCodeParams,
  TResetPasswordParams,
} from 'services/types';

export const registerUserRequest = async (userData: TRegisterUserData) => {
  try {
    return request(`${NORMA_API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userData }),
    });
  } catch (e) {
    throw e;
  }
};

export const loginRequest = async (credentials: TLoginCredentials) => {
  try {
    const { email, password } = credentials;
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

export const logoutRequest = async (refreshToken: string) => {
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

export const refreshTokenRequest = async (refreshToken: string) => {
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

export const getUserRequest = async (accessToken: string) => {
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

export const patchUserRequest = async (accessToken: string, data: TPatchUserData) => {
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

export const getResetCodeRequest = async (params: TResetCodeParams) => {
  try {
    return request(`${NORMA_API}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  } catch (e) {
    throw e;
  }
};

export const resetPasswordRequest = async (params: TResetPasswordParams) => {
  try {
    return request(`${NORMA_API}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  } catch (e) {
    throw e;
  }
};
