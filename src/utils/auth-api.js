import { NORMA_API } from 'utils/constants';
import { request } from 'utils/utils';

export const registerUserRequest = async (userData) => {
  try {
    const { email, name, password } = userData;
    return request(`${NORMA_API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, password }),
    });
  } catch (e) {
    throw e;
  }
};

export const loginRequest = async (credentials) => {
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

export const logoutRequest = async (refreshToken) => {
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

export const refreshTokenRequest = async (refreshToken) => {
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

export const getUserRequest = async (accessToken) => {
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

export const patchUserRequest = async (accessToken, userData) => {
  try {
    const { name, email, password } = userData;
    return request(`${NORMA_API}/auth/user`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: accessToken,
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password }),
      }),
    });
  } catch (e) {
    throw e;
  }
};

export const getResetCodeRequest = async (payload) => {
  try {
    return request(`${NORMA_API}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...payload }),
    });
  } catch (e) {
    throw e;
  }
};

export const resetPasswordRequest = async (payload) => {
  try {
    return request(`${NORMA_API}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...payload }),
    });
  } catch (e) {
    throw e;
  }
};
