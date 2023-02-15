import { CookieSerializeOptions } from 'cookie';

export function setCookie(
  name: string,
  value: string | number | boolean,
  options: CookieSerializeOptions = { path: '/' }
) {
  const props = JSON.parse(JSON.stringify(options));
  if (options.expires) {
    props.expires = options.expires.toUTCString();
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

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') //eslint-disable-line
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + -1 * 24 * 60 * 60 * 1000);
  setCookie(name, '', { expires });
}
