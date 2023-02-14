import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetch } from 'services/actions/ingredients';
import { TIngredient } from 'services/types/data';
import { TThunkState } from 'services/types';

const ingredientsAdapter = createEntityAdapter<TIngredient>({
  selectId: ({ _id }) => _id,
});

const ingredients = createSlice({
  name: 'ingredients',
  initialState: ingredientsAdapter.getInitialState<TThunkState>({
    status: 'idle',
    error: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.status = 'loading';
        state.error = {};
      })
      .addCase(fetch.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error) {
          state.error = action.error;
        }
      })
      .addCase(fetch.fulfilled, (state, action) => {
        const { success, data, message } = action.payload;
        if (success) {
          state.status = 'succeeded';
          state.error = {};
          ingredientsAdapter.setAll(state, data);
        } else {
          state.error = { message };
        }
      });
  },
});

export { ingredientsAdapter };
export default ingredients.reducer;
