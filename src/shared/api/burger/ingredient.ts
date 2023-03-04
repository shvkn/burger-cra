import { request } from 'shared/lib';
import { NORMA_API } from 'shared/config';

export const getIngredientsRequest = () => {
  try {
    return request<TIngredientsResponseBody>(`${NORMA_API}/ingredients`, {});
  } catch (e) {
    console.log(e);
    throw e;
  }
};
