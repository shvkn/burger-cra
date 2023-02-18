import { createEntityAdapter, createSlice, isAllOf, PayloadAction as PA } from '@reduxjs/toolkit';
import { fetch } from 'services/actions/ingredients';
import { TIngredient } from 'services/types/data';
import { TIngredientsState } from 'services/types/state';
import { TIngredientsResponseBody } from 'services/types/response';
import { hasError } from 'utils/utils';

const ingredientsAdapter = createEntityAdapter<TIngredient>({
  selectId: ({ _id }) => _id,
});

const hasData = (a: PA<TIngredientsResponseBody>): a is PA<Required<TIngredientsResponseBody>> => {
  const data = a.payload?.data;
  return !!data && Array.isArray(data);
};

const initialState = ingredientsAdapter.getInitialState<TIngredientsState>({
  status: 'idle',
  error: {},
  ids: [],
  entities: {},
});

const ingredients = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.status = 'loading';
        state.error = {};
      })
      .addCase(fetch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addMatcher(isAllOf(fetch.fulfilled, hasError), (state, action) => {
        state.error.message = action.payload.message;
      })
      .addMatcher(isAllOf(fetch.fulfilled, hasData), (state, action) => {
        state.status = 'succeeded';
        state.error = {};
        ingredientsAdapter.setAll(state, action.payload.data);
      });
  },
});

export { ingredientsAdapter };
export default ingredients.reducer;
