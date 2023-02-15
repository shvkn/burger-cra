import { NORMA_API } from 'utils/constants';
import { TIngredientsResponseBody, TOrderResponseBody } from 'services/types';
import { TIngredientId } from 'services/types/data';
// TODO Вынести в utils.ts
const processResponse = async <T>(response: Response): Promise<T> => {
  if (response.ok) return response.json();
  throw new Error(`Ошибка: ${response.status}`);
};
// TODO Вынести в utils.ts
const request = <T>(input: RequestInfo | URL, init: RequestInit): Promise<T> => {
  return fetch(input, init).then(processResponse<T>);
};

export const getIngredientsRequest = () => {
  return request<TIngredientsResponseBody>(`${NORMA_API}/ingredients`, {});
};

export const postOrderRequest = (
  accessToken: string,
  ingredients: ReadonlyArray<TIngredientId>
) => {
  return request<TOrderResponseBody>(`${NORMA_API}/orders`, {
    method: 'POST',
    headers: {
      authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  });
};
