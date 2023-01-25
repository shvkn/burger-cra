import { createSelector } from '@reduxjs/toolkit';
import { ingredientsAdapter } from 'services/slices/ingredients';

const selectIngredients = (state) => state.ingredients;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectById: _selectById,
} = ingredientsAdapter.getSelectors(selectIngredients);

const selectById = (id) => (state) => _selectById(state, id);

const selectIsSucceeded = createSelector(
  selectIngredients,
  (ingredients) => ingredients.status === 'succeeded'
);

const selectIsFailed = createSelector(
  selectIngredients,
  (ingredients) => ingredients.status === 'failed'
);

const selectIsLoading = createSelector(
  selectIngredients,
  (ingredients) => ingredients.status === 'loading'
);

const ingredientsSelectors = {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectById,
  selectIsSucceeded,
  selectIsFailed,
  selectIsLoading,
};

export default ingredientsSelectors;
