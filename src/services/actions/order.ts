import { createAsyncThunk } from '@reduxjs/toolkit';
import { callRequestWithAccessToken } from 'utils/utils';
import { postOrderRequest } from 'utils/burger-api';

export const makeOrder = createAsyncThunk(
  'order/place-order',
  async (ingredientsIds: ReadonlyArray<TIngredientId>) => {
    try {
      return callRequestWithAccessToken(postOrderRequest, ingredientsIds);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
