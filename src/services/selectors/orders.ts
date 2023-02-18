import { ordersEntityAdapter } from 'services/slices/orders';
import { createSelector } from '@reduxjs/toolkit';
import ingredientsSelectors from 'services/selectors/ingredients';
import { TIngredient, TIngredientId } from 'services/types/data';
import { TRootState } from 'services/types';

const selectOrdersSlice = (state: TRootState) => state.orders;
const selectOrderStatus = (state: TRootState) => selectOrdersSlice(state).status;
const selectOrdersStatus = (state: TRootState) => selectOrdersSlice(state).status;
const selectTotalToday = (state: TRootState) => selectOrdersSlice(state).totalToday;
const selectTotal = (state: TRootState) => selectOrdersSlice(state).total;
const {
  selectIds,
  selectEntities,
  selectAll,
  selectById,
  selectTotal: selectCount,
} = ordersEntityAdapter.getSelectors(selectOrdersSlice);
// TODO
const selectOrderById = (id: string) => (state: TRootState) => selectById(state, id);

const selectIsEmpty = createSelector(selectCount, (count) => count === 0);
// TODO  Дубликат
const selectIsLoading = createSelector(selectOrdersStatus, (status) => status === 'connecting');
const selectIsWSConnecting = createSelector(selectOrderStatus, (status) => status === 'connecting');
const selectIsWSOpened = createSelector(selectOrderStatus, (status) => status === 'opened');
const selectIsWSClosed = createSelector(selectOrderStatus, (status) => status === 'closed');

// TODO Вынести в общий функционал
const selectIngredients = (id: string) =>
  createSelector(
    [selectOrderById(id), ingredientsSelectors.selectEntities],
    (order, ingredientsEntities) => {
      return order
        ? order.ingredients
            .map((ingredientId) => ingredientsEntities[ingredientId])
            .filter((ingredient): ingredient is TIngredient => !!ingredient)
        : [];
    }
  );
// TODO Вынести в общий функционал
const selectTotalPrice = (id: string) =>
  createSelector([selectIngredients(id)], (orderIngredients) => {
    return orderIngredients.reduce((total, { price }) => total + price, 0);
  });

const ordersSelectors = {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectIngredients,
  selectIsEmpty,
  selectIsLoading,
  selectIsWSClosed,
  selectIsWSConnecting,
  selectIsWSOpened,
  selectOrderById,
  selectTotal,
  selectTotalPrice,
  selectTotalToday,
};

export default ordersSelectors;
