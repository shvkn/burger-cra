import { request } from 'shared/lib';
import { BURGER_API, NORMA_API } from 'shared/config';

export const getIngredientsRequest = () => {
  try {
    return request<TIngredientsResponseBody>(`${NORMA_API}${BURGER_API.GET_INGREDIENTS_SLUG}`, {});
  } catch (e) {
    console.log(e);
    throw e;
  }
};
