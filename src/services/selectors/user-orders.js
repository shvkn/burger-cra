import { userOrdersEntityAdapter } from 'services/slices/user-orders';

const userOrdersSlice = (state) => state.userOrders;

const { selectIds, selectEntities, selectAll, selectTotal, selectById } =
  userOrdersEntityAdapter.getSelectors(userOrdersSlice);

const selectOrderById = (id) => (state) => selectById(state, id);

const userOrdersSelectors = {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectById,
  selectOrderById,
};

export default userOrdersSelectors;
