import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsRequest } from 'utils/burger-api';

export const fetchIngredients = createAsyncThunk('ingredients/fetch', async () => {
  return getIngredientsRequest();
});
