import { userOrdersEntityAdapter } from '../slices/user-orders';

const userOrdersSlice = (state) => state.userOrders;

const { selectIds, selectEntities, selectAll, selectTotal, selectById } =
  userOrdersEntityAdapter.getSelectors(userOrdersSlice);

const selectOrderById = (id) => (state) => selectById(state, id);

export const userOrdersSelectors = {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectById,
  selectOrderById,
};
