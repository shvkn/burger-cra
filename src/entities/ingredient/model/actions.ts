import { createAsyncThunk } from '@reduxjs/toolkit';
import { burgerApi } from 'shared/api';

export const getIngredientsAsync = createAsyncThunk('ingredients/fetch', () => {
  return burgerApi.getIngredientsRequest();
});
