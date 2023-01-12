import { ordersEntityAdapter } from '../slices/orders';
import { createSelector } from '@reduxjs/toolkit';
import ingredientsSelectors from './ingredients';

const ordersSlice = (state) => state.orders;

const { selectIds, selectEntities, selectAll, selectTotal, selectById } =
  ordersEntityAdapter.getSelectors(ordersSlice);

const selectOrderById = (id) => (state) => selectById(state, id);

const isSucceeded = createSelector(ordersSlice, (orders) => orders.status === 'succeeded');

const isFailed = createSelector(ordersSlice, (orders) => orders.status === 'failed');

const isLoading = createSelector(ordersSlice, (orders) => orders.status === 'loading');

const total = createSelector(ordersSlice, (orders) => orders.total);

const totalToday = createSelector(ordersSlice, (orders) => orders.totalToday);

const ingredientsByOrderId = (id) =>
  createSelector([selectOrderById(id), ingredientsSelectors.selectEntities], (order, ingredients) =>
    order.ingredients.map((id) => ingredients[id])
  );

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
  ingredientsByOrderId,
};

export default ordersSelectors;
