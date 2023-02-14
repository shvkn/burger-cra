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
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetch.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error) {
          state.error = action.error;
        }
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        ingredientsAdapter.setAll(state, action.payload.data);
      });
  },
});

export { ingredientsAdapter };
export default ingredients.reducer;
