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

const ingredients = (id) =>
  createSelector(
    [selectOrderById(id), ingredientsSelectors.selectEntities],
    (order, ingredients) => {
      return order.ingredients.map((id) => ingredients[id]);
    }
  );

const totalPrice = (id) =>
  createSelector(
    [selectOrderById(id), ingredientsSelectors.selectEntities],
    (order, ingredients) => {
      return order.ingredients.reduce((total, id) => total + ingredients[id].price, 0);
    }
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
  ingredients,
  totalPrice,
};

export default ordersSelectors;
