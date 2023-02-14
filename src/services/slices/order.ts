import { createSlice } from '@reduxjs/toolkit';
import { makeOrder } from 'services/actions/order';
import { TThunkState } from 'services/types';

const initialState: TThunkState & {
  number: number | null;
} = {
  number: null,
  status: 'idle',
  error: null,
};

const order = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        const error = action.error;
        state.status = 'failed';
        state.error = error;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        const order = action.payload.order;
        state.number = order.number;
        state.status = 'succeeded';
        state.error = null;
      });
  },
});

export default order.reducer;
