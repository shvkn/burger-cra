import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrRefreshAccessToken } from 'utils/utils';
import { postOrderRequest } from 'utils/burger-api';

export const makeOrder = createAsyncThunk('order/makeOrder', async (ingredientsIds) => {
  const token = await getOrRefreshAccessToken();
  return postOrderRequest(ingredientsIds, token);
});
