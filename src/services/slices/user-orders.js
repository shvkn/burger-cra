import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { connect, onGetMessage, onClose, onOpen, sendMessage } from 'services/actions/user-orders';

const userOrdersEntityAdapter = createEntityAdapter({ selectId: ({ _id }) => _id });

const initialState = userOrdersEntityAdapter.getInitialState({ status: 'closed', error: null });

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
        const { success, orders, total, totalToday } = action.payload;
        if (success) {
          userOrdersEntityAdapter.setMany(state, orders);
          state.total = total;
          state.totalToday = totalToday;
          state.error = null;
        } else {
          state.error = 'Ошибка получения ленты заказов пользователя';
        }
      })
      .addCase(sendMessage, () => {});
  },
});

export { userOrdersEntityAdapter };
export default userOrdersSlice.reducer;
