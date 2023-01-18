import { createSelector } from '@reduxjs/toolkit';
import ingredientsSelectors from 'services/selectors/ingredients';

const selectBunId = (state) => state.bun;
const selectIngredientsIds = (state) => state.ingredients;
const selectCounts = (state) => state.counts;
const selectIngredientsEntities = (state) => ingredientsSelectors.selectEntities(state);

const selectBunIngredient = createSelector(
  [selectBunId, selectIngredientsEntities],
  (bunId, ingredientsEntities) => {
    return ingredientsEntities[bunId];
  }
);

const selectIngredients = createSelector(
  [selectIngredientsIds, selectIngredientsEntities],
  (ids, ingredientsEntities) => {
    return ids.map((id) => ingredientsEntities[id]);
  }
);

const selectIsBunSelected = createSelector(selectBunIngredient, (bun) => bun !== undefined);

const selectIsIngredientsSelected = createSelector(
  selectIngredientsIds,
  (ingredients) => ingredients.length > 0
);

const selectCountById = (id) => createSelector(selectCounts, (counts) => counts[id]);

const selectPrice = createSelector([selectBunIngredient, selectIngredients], (bun, ingredients) => {
  const ingredientsPrice = ingredients.reduce((s, ingredient) => s + ingredient?.price, 0);
  const bunPrice = 2 * (bun?.price ?? 0);
  return ingredientsPrice + bunPrice;
});

const burgerSelectors = {
  selectBunIngredient,
  selectBunId,
  selectCountById,
  selectIngredients,
  selectIngredientsIds,
  selectIsBunSelected,
  selectIsIngredientsSelected,
  selectPrice,
};

export default burgerSelectors;
