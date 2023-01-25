import { userOrdersEntityAdapter } from 'services/slices/user-orders';
import { createSelector } from '@reduxjs/toolkit';

const selectUserOrders = (state) => state.userOrders;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal: selectCount,
  selectById: _selectById,
} = userOrdersEntityAdapter.getSelectors(selectUserOrders);

const selectById = (id) => (state) => _selectById(state, id);
const selectIsLoading = createSelector(
  selectUserOrders,
  (userOrders) => userOrders.status === 'connection'
);

const selectIsWSConnecting = createSelector(
  selectUserOrders,
  (userOrders) => userOrders.status === 'connecting'
);

const selectIsWSClosed = createSelector(
  selectUserOrders,
  (userOrders) => userOrders.status === 'closed'
);

const selectIsWSOpened = createSelector(
  selectUserOrders,
  (userOrders) => userOrders.status === 'opened'
);

const selectIsEmpty = createSelector(selectCount, (count) => count === 0);
const selectTotal = (state) => state.userOrders.total;
const selectTotalToday = (state) => state.orders.totalToday;

const userOrdersSelectors = {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectIsEmpty,
  selectIsLoading,
  selectIsWSClosed,
  selectIsWSConnecting,
  selectIsWSOpened,
  selectTotal,
  selectTotalToday,
};

export default userOrdersSelectors;
