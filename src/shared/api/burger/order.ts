import { BURGER_API, NORMA_API } from 'shared/config';
import { request } from 'shared/api/lib';

export const createOrderRequest = (
  accessToken: string,
  ingredients: ReadonlyArray<TIngredientId>
) => {
  try {
    return request<TOrderResponseBody>(`${NORMA_API}${BURGER_API.POST_ORDER_SLUG}`, {
      method: 'POST',
      headers: {
        authorization: accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
