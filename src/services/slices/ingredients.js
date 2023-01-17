import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients, ingredientsAdapter } from 'services/actions/ingredients';

const initialState = ingredientsAdapter.getInitialState({ status: 'idle', error: null });

const ingredients = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error;
      })
      .addCase(fetchIngredients.fulfilled, (state, { payload: { data } }) => {
        state.status = 'succeeded';
        state.error = null;
        ingredientsAdapter.setAll(state, data);
      });
  },
});

export default ingredients.reducer;
