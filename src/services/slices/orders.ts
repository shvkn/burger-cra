import { createEntityAdapter, createSlice, isAllOf } from '@reduxjs/toolkit';
import { connect, onClose, onGetMessage, onOpen, sendMessage } from 'services/actions/orders';
import { TOrder } from 'services/types/data';
import { TOrdersSlice, TWebSocketSate } from 'services/types/state';
import { hasError, hasOrders } from 'utils/utils';

const ordersEntityAdapter = createEntityAdapter<TOrder>({
  selectId: ({ _id }) => _id,
});

const initialState = ordersEntityAdapter.getInitialState<TWebSocketSate & TOrdersSlice>({
  status: 'closed',
  error: {},
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
      .addCase(sendMessage, () => {})
      .addMatcher(isAllOf(onGetMessage, hasOrders), (state, action) => {
        const { orders, total, totalToday } = action.payload;
        ordersEntityAdapter.setMany(state, orders);
        state.total = total;
        state.totalToday = totalToday;
        state.error = {};
      })
      .addMatcher(isAllOf(onGetMessage, hasError), (state, action) => {
        state.error.message = action.payload?.message;
      });
  },
});

export { ordersEntityAdapter };
export default ordersSlice.reducer;
