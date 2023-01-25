import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredientsRequest } from 'utils/burger-api';

export const fetch = createAsyncThunk('ingredients/fetch', async () => {
  return getIngredientsRequest();
});
