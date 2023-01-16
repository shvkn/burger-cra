import { NORMA_API } from './constants';

const processResponse = (response) => {
  return response.json();
};

const processError = (error) => {
  console.log(error);
  throw error;
};

const request = ({ url, method = 'GET', payload = null, accessToken = null }) => {
  const options = { url, method };
  if (accessToken) {
    options['headers'] = { ...options.headers, Authorization: `Bearer ${accessToken}` };
  }
  if (payload) {
    options['headers'] = { ...options.headers, 'Content-Type': 'application/json' };
    options['body'] = JSON.stringify(payload);
  }
  return fetch(url, options).then(processResponse).catch(processError);
};

export const registerUserRequest = async (payload) =>
  request({
    url: `${NORMA_API}/auth/register`,
    method: 'POST',
    payload,
  });

export const loginRequest = async (payload) =>
  request({
    url: `${NORMA_API}/auth/login`,
    method: 'POST',
    payload,
  });

export const logoutRequest = async (refreshToken) =>
  request({
    url: `${NORMA_API}/auth/logout`,
    method: 'POST',
    payload: { token: refreshToken },
  });

export const refreshTokenRequest = async (refreshToken) =>
  request({
    url: `${NORMA_API}/auth/token`,
    method: 'POST',
    payload: { token: refreshToken },
  });

export const getUserRequest = async (accessToken) =>
  request({
    url: `${NORMA_API}/auth/user`,
    accessToken,
  });

export const patchUserRequest = async (payload, accessToken) =>
  request({
    url: `${NORMA_API}/auth/user`,
    method: 'PATCH',
    accessToken,
    payload,
  });

export const getResetCodeRequest = async (payload) =>
  request({
    url: `${NORMA_API}/password-reset`,
    method: 'POST',
    payload,
  });

export const resetPasswordRequest = async (payload) =>
  request({
    url: `${NORMA_API}/password-reset/reset`,
    method: 'POST',
    payload,
  });
