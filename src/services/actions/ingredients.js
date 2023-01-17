import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsRequest } from 'utils/burger-api';

const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  return getIngredientsRequest();
});

const ingredientsActions = {
  fetchIngredients,
};

export default ingredientsActions;
