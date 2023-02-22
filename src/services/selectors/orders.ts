import { ordersEntityAdapter } from 'services/slices/orders';
import { createSelector } from '@reduxjs/toolkit';
import ingredientsSelectors from 'services/selectors/ingredients';
import { TRootState } from 'services/types';
import { getOrderIngredients, getOrderTotalPrice } from 'utils/utils';

const selectOrdersSlice = (state: TRootState) => state.orders;
const selectWSStatus = (state: TRootState) => selectOrdersSlice(state).status;
const selectTotalToday = (state: TRootState) => selectOrdersSlice(state).totalToday;
const selectTotal = (state: TRootState) => selectOrdersSlice(state).total;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectById: _selectById,
  selectTotal: selectCount,
} = ordersEntityAdapter.getSelectors(selectOrdersSlice);

const selectById = (id: string) => (state: TRootState) => _selectById(state, id);

const selectIsEmpty = createSelector(selectCount, (count) => count === 0);

const selectIsWSConnecting = createSelector(selectWSStatus, (status) => status === 'connecting');
const selectIsWSOpened = createSelector(selectWSStatus, (status) => status === 'opened');
const selectIsWSClosed = createSelector(selectWSStatus, (status) => status === 'closed');

const selectIngredients = (id: string) =>
  createSelector(
    [selectById(id), ingredientsSelectors.selectEntities],
    (order, ingredientsEntities) => {
      return order ? getOrderIngredients(order, ingredientsEntities) : [];
    }
  );

const selectTotalPrice = (id: string) => {
  return createSelector(
    [selectById(id), ingredientsSelectors.selectEntities],
    (order, ingredientsEntities) => {
      return order ? getOrderTotalPrice(order, ingredientsEntities) : 0;
    }
  );
};

const ordersSelectors = {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectIngredients,
  selectIsEmpty,
  selectIsWSClosed,
  selectIsWSConnecting,
  selectIsWSOpened,
  selectOrderById: selectById,
  selectTotal,
  selectTotalPrice,
  selectTotalToday,
};

export default ordersSelectors;
