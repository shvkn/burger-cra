import { NORMA_API } from 'utils/constants';
import { TIngredientsResponseBody, TOrderResponseBody } from 'services/types';
import { TIngredientId } from 'services/types/data';
import { request } from 'utils/utils';

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
