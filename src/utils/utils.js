import { Tokens } from './constants';
import { refreshTokenRequest } from './auth-api';

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function eraseCookie(name) {
  const d = new Date(null);
  setCookie(name, '', { expires: d.toUTCString() });
}

export const getRefreshToken = () => {
  return getCookie(Tokens.REFRESH_TOKEN);
};

export const getAccessToken = () => {
  return getCookie(Tokens.ACCESS_TOKEN);
};

export const setRefreshToken = (refreshToken) => {
  setCookie(Tokens.REFRESH_TOKEN, refreshToken, { path: '/' });
};

export const setAccessToken = (accessToken) => {
  setCookie(Tokens.ACCESS_TOKEN, accessToken, { expires: 20 * 60, path: '/' });
};

export const dropRefreshToken = () => {
  eraseCookie(Tokens.REFRESH_TOKEN);
};

export const dropAccessToken = () => {
  eraseCookie(Tokens.ACCESS_TOKEN);
};

export const setAuthTokens = ({ accessToken, refreshToken }) => {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

export const dropAuthTokens = () => {
  dropAccessToken();
  dropRefreshToken();
};

export const getOrRefreshAccessToken = async (forceRefresh = false) => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken || forceRefresh) {
      await refreshTokens();
      return getAccessToken();
    }
    return accessToken;
  } catch (e) {
    throw e;
  }
};

export const extractToken = (token) => {
  try {
    return token.split('Bearer ')[1];
  } catch (e) {
    return undefined;
  }
};

export const refreshTokens = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      return { success: false, message: 'You should be authorized' };
    }
    const {
      success,
      message,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    } = await refreshTokenRequest(refreshToken);
    if (success) {
      const tokens = {
        success,
        accessToken: extractToken(newAccessToken),
        refreshToken: newRefreshToken,
      };
      setAuthTokens(tokens);
      return tokens;
    } else {
      return { success, message };
    }
  } catch (e) {
    throw e;
  }
};
