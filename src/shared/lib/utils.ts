import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const processResponse = async <T>(response: Response): Promise<T> => {
  try {
    return response.json();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const request = <T>(input: RequestInfo | URL, init: RequestInit): Promise<T> => {
  return fetch(input, init).then(processResponse<T>);
};

export const getErrorMessage = (error: SerializedError | FetchBaseQueryError) => {
  if ('status' in error) {
    return 'error' in error ? error.error : JSON.stringify(error.data);
  }
  return error?.message;
};

export const sumBy = <T>(arr: ReadonlyArray<T>, fn: (i: T) => number): number => {
  return arr.reduce((acc, cur) => acc + fn(cur), 0);
};
