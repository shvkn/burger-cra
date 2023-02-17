import { userOrdersEntityAdapter } from 'services/slices/user-orders';
import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from 'services/types';

const selectUserOrdersSlice = (state: TRootState) => state.userOrders;
const selectTotalToday = (state: TRootState) => selectUserOrdersSlice(state).totalToday;
const selectTotal = (state: TRootState) => selectUserOrdersSlice(state).total;
const selectStatus = (state: TRootState) => selectUserOrdersSlice(state).status;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal: selectCount,
  selectById: _selectById,
} = userOrdersEntityAdapter.getSelectors(selectUserOrdersSlice);
const selectIsEmpty = createSelector(selectCount, (count) => count === 0);
const selectById = (id: string) => (state: TRootState) => _selectById(state, id);
// const selectIsLoading = createSelector(selectStatus, (status) => status === 'connecting');
const selectIsWSConnecting = createSelector(selectStatus, (status) => status === 'connecting');
const selectIsWSClosed = createSelector(selectStatus, (status) => status === 'closed');
const selectIsWSOpened = createSelector(selectStatus, (status) => status === 'opened');

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
};

export default userOrdersSelectors;
