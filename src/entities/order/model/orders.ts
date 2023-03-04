import {
  createEntityAdapter,
  createSelector,
  createSlice,
  Dictionary,
  isAllOf,
  PayloadAction,
} from '@reduxjs/toolkit';
import { connect, onClose, onGetMessage, onOpen, sendMessage } from 'entities/order/model/actions';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getOrderIngredients, getOrderTotalPrice } from 'utils/utils';
import { useSelector } from 'react-redux';

export const hasError = (
  action: PayloadAction<TBaseResponseBody>
): action is PayloadAction<TBaseResponseBody & { success: false; message?: string }> => {
  return !action.payload?.success;
};

export const hasOrders = (
  action: PayloadAction<TOrderWsMessage>
): action is PayloadAction<Required<TOrderWsMessage>> => {
  return !!action.payload?.orders;
};

const ordersEntityAdapter = createEntityAdapter<TOrder>({ selectId: ({ _id }) => _id });

const initialState = ordersEntityAdapter.getInitialState<{
  status: 'closed' | 'opened' | 'connecting';
  isConnected: boolean;
  total: number;
  totalToday: number;
  error: FetchBaseQueryError | SerializedError | undefined;
}>({
  status: 'closed',
  error: undefined,
  isConnected: false,
  total: 0,
  totalToday: 0,
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connect, (state) => {
        state.status = 'connecting';
      })
      .addCase(onOpen, (state) => {
        state.status = 'opened';
      })
      .addCase(onClose, () => initialState)
      .addCase(sendMessage, () => {})
      .addMatcher(isAllOf(onGetMessage, hasOrders), (state, action) => {
        const { orders, total, totalToday } = action.payload;
        ordersEntityAdapter.setMany(state, orders);
        state.total = total;
        state.totalToday = totalToday;
        state.error = {};
      })
      .addMatcher(isAllOf(onGetMessage, hasError), (state, action) => {
        state.error = {
          message: action.payload?.message ?? `Unknown error. Check onGetMessage`,
        };
      });
  },
});

export const { reducer } = ordersSlice;

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

const selectIngredients = (id: string) => (ingredientsEntities: Dictionary<TIngredient>) => {
  return createSelector([selectById(id)], (order) => {
    return order ? getOrderIngredients(order, ingredientsEntities) : [];
  });
};

const selectTotalPrice = (id: string) => (ingredientsEntities: Dictionary<TIngredient>) => {
  return createSelector([selectById(id)], (order) => {
    return order ? getOrderTotalPrice(order, ingredientsEntities) : 0;
  });
};

export const selectors = {
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

export const useOrders = ({
  ingredientsEntities,
}: {
  ingredientsEntities: Dictionary<TIngredient>;
}) => {
  const ingredients = useSelector(selectAll);
  const entities = useSelector(selectEntities);
  const ids = useSelector(selectIds);
  const isEmpty = useSelector(selectIsEmpty);
  const isWsClosed = useSelector(selectIsWSClosed);
  const isWsOpened = useSelector(selectIsWSOpened);
  const isWsConnecting = useSelector(selectIsWSConnecting);
  const total = useSelector(selectTotal);
  const totalToday = useSelector(selectTotalToday);
  const totalPrice = useSelector(selectTotalPrice);

  return {
    ingredients,
    entities,
    ids,
    isEmpty,
    isWsClosed,
    isWsOpened,
    isWsConnecting,
    total,
    totalToday,
    totalPrice,
  };
};
