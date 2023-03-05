import { createAsyncThunk } from '@reduxjs/toolkit';

import { burgerApi } from 'shared/api';
import { callRequestWithAccessToken } from 'shared/lib';

export const makeOrder = createAsyncThunk(
  'order/place-order',
  async (ingredientsIds: ReadonlyArray<TIngredientId>) => {
    try {
      return callRequestWithAccessToken(burgerApi.createOrderRequest, ingredientsIds);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
