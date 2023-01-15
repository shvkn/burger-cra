import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const userOrdersEntityAdapter = createEntityAdapter({ selectId: ({ _id }) => _id });

const initialState = userOrdersEntityAdapter.getInitialState({ status: 'idle', error: null });

const userOrdersSlice = createSlice({
  name: 'user-orders',
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
        userOrdersEntityAdapter.setMany(state, orders);
        state.total = total;
        state.totalToday = totalToday;
      } else {
        const errorMessage = 'Ошибка получения ленты заказов пользователя';
        state.status = 'failed';
        state.error = errorMessage;
        throw new Error(errorMessage);
      }
    },
    sendMessage: (state, action) => {},
  },
});

const { connect, open, close, getMessage, sendMessage, ...userOrdersActions } =
  userOrdersSlice.actions;

const userOrdersWsActions = {
  connect,
  open,
  close,
  getMessage,
  sendMessage,
};

export { userOrdersEntityAdapter, userOrdersActions, userOrdersWsActions };
export default userOrdersSlice.reducer;
