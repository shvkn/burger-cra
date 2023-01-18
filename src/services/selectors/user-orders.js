import { userOrdersEntityAdapter } from 'services/slices/user-orders';

const selectUserOrders = (state) => state.userOrders;

const { selectIds, selectEntities, selectAll, selectTotal, selectById } =
  userOrdersEntityAdapter.getSelectors(selectUserOrders);

const selectUserOrderById = (id) => (state) => selectById(state, id);

const userOrdersSelectors = {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectById,
  selectOrderById: selectUserOrderById,
};

export default userOrdersSelectors;
