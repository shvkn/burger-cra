import { createSlice } from '@reduxjs/toolkit';
import { makeOrder } from 'services/actions/order';
import { TThunkState } from 'services/types';

const initialState: TThunkState & {
  number: number | null;
} = {
  number: null,
  status: 'idle',
  error: {},
};

const order = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.status = 'loading';
        state.error = {};
      })
      .addCase(makeOrder.rejected, (state, action) => {
        const error = action.error;
        state.status = 'failed';
        state.error = error;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        const { order, success, message } = action.payload;
        if (success) {
          state.number = order.number;
          state.status = 'succeeded';
          state.error = {};
        } else {
          state.error = { message };
        }
      });
  },
});

export default order.reducer;
