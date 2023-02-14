import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredientsRequest } from 'utils/burger-api';
import { TIngredientsResponse, TResponseBody } from 'services/types';

export const fetch = createAsyncThunk('ingredients/fetch', async () => {
  return (await getIngredientsRequest()) as TResponseBody<TIngredientsResponse>;
});
