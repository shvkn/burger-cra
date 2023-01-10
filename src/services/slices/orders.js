import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const ordersEntityAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
});

const initialState = ordersEntityAdapter.getInitialState({ status: 'idle', error: null });

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    connect: (state, action) => {
      state.status = 'loading';
    },
    open: (state, action) => {
      state.status = 'succeeded';
    },
    close: (state, action) => {
      state.status = 'idle';
    },
    getMessage: (state, { payload }) => {
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
    },
    sendMessage: (state, action) => {},
  },
});

const { connect, open, close, getMessage, sendMessage, ...ordersActions } = ordersSlice.actions;
const ordersWsActions = {
  connect,
  open,
  close,
  getMessage,
  sendMessage,
};
export { ordersEntityAdapter, ordersActions, ordersWsActions };
export default ordersSlice.reducer;
