import { NORMA_API } from './constants';

const postRequest = (url, data) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((e) => {
      console.log(e);
      throw e;
    });
};
export const registerUserRequest = (userdata) => {
  return postRequest(`${NORMA_API}/auth/register`, userdata);
};

export const loginRequest = (userdata) => {
  return postRequest(`${NORMA_API}/auth/login`, userdata);
};

export const logoutRequest = (refreshToken) => {
  return postRequest(`${NORMA_API}/auth/logout`, { token: refreshToken });
};

export const refreshTokenRequest = (refreshToken) => {
  return postRequest(`${NORMA_API}/auth/token`, { token: refreshToken });
};

export const getUserRequest = (accessToken) => {
  return fetch(`${NORMA_API}/auth/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => response.json());
};

export const patchUserRequest = (userdata, accessToken) => {
  return fetch(`${NORMA_API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(userdata),
  }).then((response) => response.json());
};

export const getResetCodeRequest = (form) => {
  return postRequest(`${NORMA_API}/password-reset`, form);
};

export const resetPasswordRequest = (form) => {
  return postRequest(`${NORMA_API}/password-reset/reset`, form);
};
