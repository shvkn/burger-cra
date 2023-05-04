import { createAsyncThunk } from '@reduxjs/toolkit';

import { burgerApi } from 'shared/api';
import { getAccessToken } from 'shared/lib';

export const makeOrder = createAsyncThunk(
  'order/place-order',
  async (ingredientsIds: ReadonlyArray<TIngredientId>) => {
    try {
      // TODO Временный патч
      const accessToken = getAccessToken() ?? '';
      return burgerApi.createOrderRequest(accessToken, ingredientsIds);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
