import { createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { getIngredientsRequest } from 'utils/burger-api';

export const ingredientsAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
});
export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  return getIngredientsRequest();
});
