import { createSlice, isAllOf, PayloadAction as PA } from '@reduxjs/toolkit';
import { makeOrder } from 'services/actions/order';
import {
  TBaseResponseBody,
  TKeySuccessFalse,
  TOrderResponseBody,
  TThunkState,
} from 'services/types';

const initialState: TThunkState & {
  number: number | null;
} = {
  number: null,
  status: 'idle',
  error: {},
};

const hasOrder = (a: PA<TOrderResponseBody>): a is PA<Required<TOrderResponseBody>> => {
  return !!a.payload?.order;
};

const hasError = (a: PA<TBaseResponseBody>): a is PA<TBaseResponseBody & TKeySuccessFalse> => {
  return !a.payload?.success;
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
