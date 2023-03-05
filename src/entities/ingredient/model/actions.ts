import { createAsyncThunk } from '@reduxjs/toolkit';

import { burgerApi } from 'shared/api';

export const getIngredientsAsync = createAsyncThunk<
  TIngredientsResponseBody,
  void,
  { state: TRootState }
>(
  'ingredients/fetch',
  () => {
    return burgerApi.getIngredientsRequest();
  },
  {
    condition: (_, { getState }) => {
      const { ingredients } = getState();
      if (ingredients.status === 'succeeded' || ingredients.status === 'loading') {
        return false;
      }
    },
  }
);
