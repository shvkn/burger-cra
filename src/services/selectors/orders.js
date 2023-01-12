import { ordersEntityAdapter } from '../slices/orders';
import { createSelector } from '@reduxjs/toolkit';

const ordersSlice = (state) => state.orders;

const { selectIds, selectEntities, selectAll, selectTotal, selectById } =
  ordersEntityAdapter.getSelectors(ordersSlice);

const selectOrderById = (id) => (state) => selectById(state, id);

const isSucceeded = createSelector(ordersSlice, (orders) => orders.status === 'succeeded');

const isFailed = createSelector(ordersSlice, (orders) => orders.status === 'failed');

const isLoading = createSelector(ordersSlice, (orders) => orders.status === 'loading');

const total = createSelector(ordersSlice, (orders) => orders.total);

const totalToday = createSelector(ordersSlice, (orders) => orders.totalToday);

const ordersSelectors = {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectById,
  selectOrderById,
  isSucceeded,
  isFailed,
  isLoading,
  total,
  totalToday,
};

export default ordersSelectors;
