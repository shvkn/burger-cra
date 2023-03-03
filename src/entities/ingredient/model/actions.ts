import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsRequest } from 'utils/burger-api';

export const getIngredientsAsync = createAsyncThunk('ingredients/fetch', () => {
  return getIngredientsRequest();
});
