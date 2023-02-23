import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from 'services/types';

const selectOrderSlice = (state: TRootState) => state.order;
const selectOrderNumber = (state: TRootState) => selectOrderSlice(state).number;
const selectOrderStatus = (state: TRootState) => selectOrderSlice(state).status;
const selectIsOrderLoading = createSelector(selectOrderStatus, (status) => status === 'loading');
const selectIsOrderFailed = createSelector(selectOrderSlice, (order) => order.status === 'failed');
const selectIsOrderSucceeded = createSelector(
  selectOrderStatus,
  (status) => status === 'succeeded'
);

const orderSelectors = {
  selectOrderNumber,
  selectIsOrderLoading,
  selectIsOrderFailed,
  selectIsOrderSucceeded,
};

export default orderSelectors;
