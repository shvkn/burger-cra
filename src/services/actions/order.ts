import { createAsyncThunk } from '@reduxjs/toolkit';
import { callRequestWithAccessToken } from 'utils/utils';
import { burgerApi } from 'shared/api';

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
