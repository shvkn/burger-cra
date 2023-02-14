import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { connect, onClose, onGetMessage, onOpen, sendMessage } from 'services/actions/orders';
import { TOrder } from 'services/types/data';
import { TOrdersResponse, TOrdersState, TResponseBody, TWebSocketSate } from 'services/types';

const ordersEntityAdapter = createEntityAdapter<TOrder>({
  selectId: ({ _id }) => _id,
});

const initialState = ordersEntityAdapter.getInitialState<TWebSocketSate & TOrdersState>({
  status: 'closed',
  error: null,
  isConnected: false,
  total: 0,
  totalToday: 0,
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
      .addCase(onGetMessage, (state, action: PayloadAction<TResponseBody<TOrdersResponse>>) => {
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
