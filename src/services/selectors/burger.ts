import { createSelector } from '@reduxjs/toolkit';
import ingredientsSelectors from 'services/selectors/ingredients';
import { TRootState } from 'services/types';
import { TIngredient, TIngredientId } from 'services/types/data';
import { TBurgerSlice } from 'services/types/state';

const selectIngredientsEntities = (state: TRootState) => ingredientsSelectors.selectEntities(state);
const selectBurgerSlice = (state: TRootState): TBurgerSlice => state.burger;
const selectIngredientsIds = (state: TRootState) => selectBurgerSlice(state).ingredients;
const selectCounts = (state: TRootState) => selectBurgerSlice(state).counts;
const selectBunId = (state: TRootState) => selectBurgerSlice(state).bun;

const selectBunIngredient = createSelector(
  [selectBunId, selectIngredientsEntities],
  (bunId, ingredientsEntities) => {
    return ingredientsEntities[bunId];
  }
);

const selectIngredients = createSelector(
  [selectIngredientsIds, selectIngredientsEntities],
  (ids, ingredientsEntities) => {
    return ids.map(({ id }) => ingredientsEntities[id]).filter((i): i is TIngredient => !!i);
  }
);

const selectIsBunSelected = createSelector(selectBunIngredient, (bun) => bun !== undefined);

const selectIsIngredientsSelected = createSelector(
  selectIngredientsIds,
  (ingredients) => ingredients.length > 0
);

const selectCountById = (id: TIngredientId) => createSelector(selectCounts, (counts) => counts[id]);

export const selectTotalPrice = createSelector(
  [selectBunIngredient, selectIngredients, selectCounts],
  (bun, ingredients, counts) => {
    const ingredientsPrice = ingredients.reduce((s, { price, _id }) => {
      return s + price * counts[_id] ?? 0;
    }, 0);
    const bunPrice = 2 * (bun?.price ?? 0);
    return ingredientsPrice + bunPrice;
  }
);

export const selectOrderSlice = (state: TRootState) => state.order;
export const selectBurgerBun = (state: TRootState) => state.burger.bun;
export const selectBurgerIngredients = (state: TRootState) => state.burger.ingredients;
export const selectBurgerCounts = (state: TRootState) => state.burger.counts;
export const selectIngredientCountById = (id: TIngredientId) =>
  createSelector([selectBurgerCounts], (counts) => {
    return counts[id] || 0;
  });
export const selectOrderNumber = (state: TRootState) => selectOrderSlice(state).number;

export const selectIsBurgerBunEmpty = createSelector(selectBurgerBun, (bun) => bun === null);
export const selectIsBurgerIngredientsEmpty = createSelector(
  selectBurgerIngredients,
  (ingredients) => ingredients.length === 0
);

const burgerSelectors = {
  selectBunIngredient,
  selectBunId,
  selectCountById,
  selectIngredients,
  selectIngredientsIds,
  selectIsBunSelected,
  selectIsIngredientsSelected,
  selectTotalPrice,
};

export default burgerSelectors;
