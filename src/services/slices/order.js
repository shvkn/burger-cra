import { createSlice } from '@reduxjs/toolkit';
import { makeOrder } from 'services/actions/order';

const initialState = {
  number: null,
  isLoading: false,
  error: null,
};

const order = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(makeOrder.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      .addCase(makeOrder.fulfilled, (state, { payload: { order } }) => {
        state.number = order.number;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default order.reducer;
