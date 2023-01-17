import { ordersEntityAdapter } from 'services/slices/orders';
import { createSelector } from '@reduxjs/toolkit';
import ingredientsSelectors from 'services/selectors/ingredients';

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
    (order, ingredientsEntities) => {
      return order.ingredients
        .map((id) => ingredientsEntities[id])
        .filter((ingredient) => !!ingredient);
    }
  );

const totalPrice = (id) =>
  createSelector(
    [ingredients(id), ingredientsSelectors.selectEntities],
    (orderIngredients, ingredientsEntities) => {
      return orderIngredients.reduce((total, ingredient) => {
        return total + ingredientsEntities[ingredient._id].price;
      }, 0);
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
