import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getIngredientsRequest } from '../../utils/burger-api';
import { selectIngredientsSlice } from '../../utils/selectors';

const ingredientsAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
});
const initialState = ingredientsAdapter.getInitialState({ loadingState: 'idle', error: null });

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () =>
  getIngredientsRequest()
);

const processPending = () => (state) => {
  state.loadingState = 'loading';
  state.error = null;
};

const processRejected =
  () =>
  (state, { payload: error }) => {
    state.loadingState = 'idle';
    state.error = error;
  };

const processFulfilled = (state) => {
  state.loadingState = 'idle';
  state.error = null;
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, processPending())
      .addCase(fetchIngredients.rejected, processRejected())
      .addCase(fetchIngredients.fulfilled, (state, { payload: { data } }) => {
        processFulfilled(state);
        ingredientsAdapter.setAll(state, data);
      });
  },
});

export const {
  selectAll: selectAllIngredients,
  selectIds: selectIngredientsIds,
  selectTotal: selectIngredientsTotal,
  selectById: selectIngredientById,
  selectEntities: selectIngredientsEntities,
} = ingredientsAdapter.getSelectors((state) => state.ingredients);

export default ingredientsSlice.reducer;
