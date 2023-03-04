import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Dictionary } from '@reduxjs/toolkit';

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

export const groupBy = <T extends any, K extends (item: T) => string>(
  arr: ReadonlyArray<T>,
  fn: K
): Record<ReturnType<K>, T[]> => {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
};

export const mapIdsToEntities = <T>(
  ids: ReadonlyArray<string>,
  entities: Dictionary<T>
): Array<T> => {
  return ids.map((id) => entities[id]).filter((i): i is T => !!i);
};
