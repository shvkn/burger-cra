import { createEntityAdapter, createSlice, isAllOf } from '@reduxjs/toolkit';
import { connect, onClose, onGetMessage, onOpen, sendMessage } from 'services/actions/user-orders';
import { hasError, hasOrders } from 'utils/utils';

const userOrdersEntityAdapter = createEntityAdapter<TOrder>({ selectId: ({ _id }) => _id });

const initialState = userOrdersEntityAdapter.getInitialState<TWebSocketSate & TUserOrdersSlice>({
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
      .addCase(sendMessage, () => {})
      .addMatcher(isAllOf(onGetMessage, hasError), (state, action) => {
        state.error.message = action.payload?.message;
      })
      .addMatcher(isAllOf(onGetMessage, hasOrders), (state, action) => {
        const { orders, total, totalToday } = action.payload;
        userOrdersEntityAdapter.setMany(state, orders);
        state.total = total;
        state.totalToday = totalToday;
        state.error = {};
      });
  },
});

export { userOrdersEntityAdapter };
export default userOrdersSlice.reducer;
