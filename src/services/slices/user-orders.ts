import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { connect, onGetMessage, onClose, onOpen, sendMessage } from 'services/actions/user-orders';
import { TOrder } from 'services/types/data';
import { TOrdersState, TWebSocketSate } from 'services/types';

const userOrdersEntityAdapter = createEntityAdapter<TOrder>({ selectId: ({ _id }) => _id });

const initialState = userOrdersEntityAdapter.getInitialState<TWebSocketSate & TOrdersState>({
  status: 'closed',
  error: {},
  isConnected: false,
  total: 0,
  totalToday: 0,
});

const userOrdersSlice = createSlice({
  name: 'user-orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connect, (state, _) => {
        state.status = 'connecting';
      })
      .addCase(onOpen, (state, _) => {
        state.status = 'opened';
      })
      .addCase(onClose, (state, _) => initialState)
      .addCase(onGetMessage, (state, action) => {
        const { success, orders, total, totalToday, message } = action.payload;
        if (success) {
          userOrdersEntityAdapter.setMany(state, orders);
          state.total = total;
          state.totalToday = totalToday;
          state.error = {};
        } else {
          state.error.message = message;
        }
      })
      .addCase(sendMessage, () => {});
  },
});

export { userOrdersEntityAdapter };
export default userOrdersSlice.reducer;
