import { createAsyncThunk } from '@reduxjs/toolkit';
import { processAuthorizedRequest } from 'utils/utils';
import { postOrderRequest } from 'utils/burger-api';

export const makeOrder = createAsyncThunk('order/place-order', async (ingredientsIds) => {
  try {
    return processAuthorizedRequest(postOrderRequest, ingredientsIds);
  } catch (e) {
    console.log(e);
    throw e;
  }
});
