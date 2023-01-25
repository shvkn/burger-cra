import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { onClose, connect, onGetMessage, onOpen, sendMessage } from 'services/actions/orders';

const ordersEntityAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
});

const initialState = ordersEntityAdapter.getInitialState({
  status: 'closed',
  error: null,
  isConnected: false,
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connect, (state) => {
        state.status = 'connecting';
      })
      .addCase(onOpen, (state) => {
        state.status = 'opened';
      })
      .addCase(onClose, () => initialState)
      .addCase(onGetMessage, (state, action) => {
        const { success, orders, total, totalToday } = action.payload;
        if (success) {
          ordersEntityAdapter.setMany(state, orders);
          state.total = total;
          state.totalToday = totalToday;
          state.error = null;
        } else {
          state.error = 'Ошибка получения ленты заказов';
        }
      })
      .addCase(sendMessage, () => {});
  },
});

export { ordersEntityAdapter };
export default ordersSlice.reducer;
