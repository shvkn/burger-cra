import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import ordersWsActions from 'services/actions/orders';

const { close, connect, getMessage, open, sendMessage } = ordersWsActions;

const ordersEntityAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
});

const initialState = ordersEntityAdapter.getInitialState({ status: 'idle', error: null });

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connect, (state) => {
        state.status = 'loading';
      })
      .addCase(open, (state) => {
        state.status = 'succeeded';
      })
      .addCase(close, (state) => {
        state.status = 'idle';
      })
      .addCase(getMessage, (state, { payload }) => {
        const { success, orders, total, totalToday } = payload;
        if (success) {
          state.status = 'succeeded';
          ordersEntityAdapter.setMany(state, orders);
          state.total = total;
          state.totalToday = totalToday;
        } else {
          const errorMessage = 'Ошибка получения ленты заказов';
          state.status = 'failed';
          state.error = errorMessage;
          throw new Error(errorMessage);
        }
      })
      .addCase(sendMessage, () => {});
  },
});

export { ordersEntityAdapter };
export default ordersSlice.reducer;
