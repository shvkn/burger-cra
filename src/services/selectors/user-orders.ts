import { userOrdersEntityAdapter } from 'services/slices/user-orders';
import { createSelector } from '@reduxjs/toolkit';
import ingredientsSelectors from 'services/selectors/ingredients';
import { getOrderIngredients, getOrderTotalPrice } from 'utils/utils';

const selectUserOrdersSlice = (state: TRootState) => state.userOrders;
const selectTotalToday = (state: TRootState) => selectUserOrdersSlice(state).totalToday;
const selectTotal = (state: TRootState) => selectUserOrdersSlice(state).total;
const selectWSStatus = (state: TRootState) => selectUserOrdersSlice(state).status;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal: selectCount,
  selectById: _selectById,
} = userOrdersEntityAdapter.getSelectors(selectUserOrdersSlice);

const selectIsEmpty = createSelector(selectCount, (count) => count === 0);
const selectById = (id: string) => (state: TRootState) => _selectById(state, id);

const selectIsWSConnecting = createSelector(selectWSStatus, (status) => status === 'connecting');
const selectIsWSClosed = createSelector(selectWSStatus, (status) => status === 'closed');
const selectIsWSOpened = createSelector(selectWSStatus, (status) => status === 'opened');

const selectIngredients = (id: string) => {
  return createSelector(
    [selectById(id), ingredientsSelectors.selectEntities],
    (order, ingredientsEntities) => {
      return order ? getOrderIngredients(order, ingredientsEntities) : [];
    }
  );
};

const selectTotalPrice = (id: string) => {
  return createSelector(
    [selectById(id), ingredientsSelectors.selectEntities],
    (order, ingredientsEntities) => {
      return order ? getOrderTotalPrice(order, ingredientsEntities) : 0;
    }
  );
};

const userOrdersSelectors = {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectIsEmpty,
  selectIsWSClosed,
  selectIsWSConnecting,
  selectIsWSOpened,
  selectTotal,
  selectTotalToday,
  selectIngredients,
  selectTotalPrice,
};

export default userOrdersSelectors;
