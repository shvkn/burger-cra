import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import userOrdersWsActions from 'services/actions/user-orders';

const { close, connect, getMessage, open, sendMessage } = userOrdersWsActions;

const userOrdersEntityAdapter = createEntityAdapter({ selectId: ({ _id }) => _id });

const initialState = userOrdersEntityAdapter.getInitialState({ status: 'idle', error: null });

const userOrdersSlice = createSlice({
  name: 'user-orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connect, (state, action) => {
        state.status = 'loading';
      })
      .addCase(open, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(close, (state, action) => {
        state.status = 'idle';
      })
      .addCase(getMessage, (state, { payload }) => {
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
      })
      .addCase(sendMessage, (state, action) => {});
  },
});

export { userOrdersEntityAdapter };
export default userOrdersSlice.reducer;
