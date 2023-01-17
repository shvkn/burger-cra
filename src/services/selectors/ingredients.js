import { createSelector } from '@reduxjs/toolkit';
import { ingredientsAdapter } from 'services/slices/ingredients';

const ingredientsSlice = (state) => state.ingredients;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectById: _selectById,
} = ingredientsAdapter.getSelectors(ingredientsSlice);

const selectById = (id) => (state) => _selectById(state, id);

const isSucceeded = createSelector(
  ingredientsSlice,
  (ingredients) => ingredients.status === 'succeeded'
);

const isFailed = createSelector(ingredientsSlice, (ingredients) => ingredients.status === 'failed');

const isLoading = createSelector(
  ingredientsSlice,
  (ingredients) => ingredients.status === 'loading'
);

const ingredientsSelectors = {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectById,
  isSucceeded,
  isFailed,
  isLoading,
};

export default ingredientsSelectors;
