import { ordersEntityAdapter } from 'services/slices/orders';
import { createSelector } from '@reduxjs/toolkit';
import ingredientsSelectors from 'services/selectors/ingredients';

const selectOrders = (state) => state.orders;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectById,
  selectTotal: selectCount,
} = ordersEntityAdapter.getSelectors(selectOrders);

const selectOrderById = (id) => (state) => selectById(state, id);

const selectIsLoading = createSelector(selectOrders, (orders) => orders.status === 'connecting');
const selectIsEmpty = createSelector(selectCount, (count) => count === 0);
const selectTotal = (state) => state.orders.total;
const selectTotalToday = (state) => state.orders.totalToday;

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
  selectIsLoading,
  selectIsEmpty,
  selectOrderById,
  selectTotal,
  selectTotalPrice,
  selectTotalToday,
};

export default ordersSelectors;
