import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetch } from 'services/actions/ingredients';

const ingredientsAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
});

const initialState = ingredientsAdapter.getInitialState({ status: 'idle', error: null });

const ingredients = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
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
