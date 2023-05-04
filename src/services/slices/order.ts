import { createSlice, isAllOf, PayloadAction } from '@reduxjs/toolkit';

import { makeOrder } from 'services/actions/order';

export const hasError = (
  action: PayloadAction<TBaseResponseBody>
): action is PayloadAction<TBaseResponseBody & { success: true }> => {
  return !action.payload?.success;
};

const initialState: TThunkState & {
  number: number | null;
} = {
  number: null,
  status: 'idle',
  error: {},
};

const hasOrder = (
  a: PayloadAction<TOrderResponseBody>
): a is PayloadAction<Required<TOrderResponseBody>> => {
  return !!a.payload?.order;
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
      .addMatcher(isAllOf(makeOrder.fulfilled, hasError), (state, action) => {
        state.error.message = action.payload.message;
        state.status = 'failed';
      })
      .addMatcher(isAllOf(makeOrder.fulfilled, hasOrder), (state, action) => {
        const order = action.payload.order;
        state.number = order.number;
        state.status = 'succeeded';
        state.error = {};
      });
  },
});

export default order.reducer;
