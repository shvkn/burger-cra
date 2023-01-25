import { createSelector } from '@reduxjs/toolkit';

const selectOrder = (state) => state.order;
const selectOrderNumber = (state) => state.order.number;

const selectIsOrderLoading = createSelector(selectOrder, (order) => order.status === 'loading');
const selectIsOrderFailed = createSelector(selectOrder, (order) => order.status === 'failed');
const selectIsOrderSucceeded = createSelector(selectOrder, (order) => order.status === 'succeeded');

const orderSelectors = {
  selectOrderNumber,
  selectIsOrderLoading,
  selectIsOrderFailed,
  selectIsOrderSucceeded,
};

export default orderSelectors;
