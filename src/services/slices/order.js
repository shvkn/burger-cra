import { createSlice } from '@reduxjs/toolkit';
import { makeOrder } from 'services/actions/order';

const initialState = {
  number: null,
  status: 'idle',
  error: null,
};

const order = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(makeOrder.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error;
      })
      .addCase(makeOrder.fulfilled, (state, { payload: { order } }) => {
        state.number = order.number;
        state.status = 'succeeded';
        state.error = null;
      });
  },
});

export default order.reducer;
