import { ordersEntityAdapter } from 'services/slices/orders';
import { createSelector } from '@reduxjs/toolkit';
import ingredientsSelectors from 'services/selectors/ingredients';

const selectOrders = (state) => state.orders;

const { selectIds, selectEntities, selectAll, selectById } =
  ordersEntityAdapter.getSelectors(selectOrders);

const selectOrderById = (id) => (state) => selectById(state, id);

const selectIsSucceeded = createSelector(selectOrders, (orders) => orders.status === 'succeeded');

const selectIsFailed = createSelector(selectOrders, (orders) => orders.status === 'failed');

const selectIsLoading = createSelector(selectOrders, (orders) => orders.status === 'loading');

const selectTotal = createSelector(selectOrders, (orders) => orders.total);

const selectTotalToday = createSelector(selectOrders, (orders) => orders.totalToday);

const selectIngredients = (id) =>
  createSelector(
    [selectOrderById(id), ingredientsSelectors.selectEntities],
    (order, ingredientsEntities) => {
      return order.ingredients
        .map((id) => ingredientsEntities[id])
        .filter((ingredient) => !!ingredient);
    }
  );

const selectTotalPrice = (id) =>
  createSelector(
    [selectIngredients(id), ingredientsSelectors.selectEntities],
    (orderIngredients, ingredientsEntities) => {
      return orderIngredients.reduce((total, ingredient) => {
        return total + ingredientsEntities[ingredient._id].price;
      }, 0);
    }
  );

const ordersSelectors = {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectIngredients,
  selectIsFailed,
  selectIsLoading,
  selectIsSucceeded,
  selectOrderById,
  selectTotal,
  selectTotalPrice,
  selectTotalToday,
};

export default ordersSelectors;
