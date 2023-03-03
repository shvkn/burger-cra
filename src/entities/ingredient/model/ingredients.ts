import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  isAllOf,
} from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { getIngredientsAsync } from './actions';

const entityAdapter = createEntityAdapter<TIngredient>({ selectId: ({ _id }) => _id });

export const hasError = (
  action: PayloadAction<TBaseResponseBody>
): action is PayloadAction<TBaseResponseBody & TKeySuccessFalse> => {
  return !action.payload?.success;
};

const hasData = (
  action: PayloadAction<TIngredientsResponseBody>
): action is PayloadAction<Required<TIngredientsResponseBody>> => {
  const data = action.payload?.data;
  return Array.isArray(data) && !!data.length;
};

const initialState = entityAdapter.getInitialState<
  {
    status: 'idle' | 'loading' | 'failed' | 'succeeded';
    error: SerializedError;
  } & EntityState<TIngredient>
>({
  status: 'idle',
  error: {},
  ids: [],
  entities: {},
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsAsync.pending, (state) => {
        state.status = 'loading';
        state.error = {};
      })
      .addCase(getIngredientsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addMatcher(isAllOf(getIngredientsAsync.fulfilled, hasError), (state, action) => {
        state.error.message = action.payload.message;
      })
      .addMatcher(isAllOf(getIngredientsAsync.fulfilled, hasData), (state, action) => {
        state.status = 'succeeded';
        state.error = {};
        entityAdapter.setAll(state, action.payload.data);
      });
  },
});

export const { reducer } = ingredientsSlice;

const selectSlice = (state: TRootState) => state.ingredients;
const selectStatus = (state: TRootState) => selectSlice(state).status;
const selectError = (state: TRootState) => selectSlice(state).error;

const { selectIds, selectEntities, selectAll, selectTotal, selectById } =
  entityAdapter.getSelectors(selectSlice);

const selectIsSucceeded = createSelector(selectStatus, (status) => status === 'succeeded');
const selectIsLoading = createSelector(selectStatus, (status) => status === 'loading');
const selectIsFailed = createSelector(selectStatus, (status) => status === 'failed');

export const selectors = {
  selectAll,
  selectById,
  selectEntities,
  selectError,
  selectIds,
  selectIsFailed,
  selectIsLoading,
  selectIsSucceeded,
  selectSlice,
  selectStatus,
  selectTotal,
};

export const useIngredients = () => {
  const entities = useSelector(selectEntities);
  const error = useSelector(selectError);
  const ids = useSelector(selectIds);
  const isFailed = useSelector(selectIsFailed);
  const isLoading = useSelector(selectIsLoading);
  const ingredients = useSelector(selectAll);
  const isSucceeded = useSelector(selectIsSucceeded);
  const state = useSelector(selectSlice);
  const status = useSelector(selectStatus);
  const total = useSelector(selectTotal);

  return {
    entities,
    error,
    ids,
    isFailed,
    isLoading,
    ingredients,
    isSucceeded,
    state,
    status,
    total,
  };
};

export const useIngredient = (id: string) =>
  useSelector((state: TRootState) => selectById(state, id));
