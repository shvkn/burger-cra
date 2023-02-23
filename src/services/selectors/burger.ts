import { createSelector } from '@reduxjs/toolkit';
import ingredientsSelectors from 'services/selectors/ingredients';
import { TBurgerIngredient, TRootState } from 'services/types';
import { TIngredientId } from 'services/types/data';
import { TBurgerSlice } from 'services/types/state';
import { sumBy } from 'utils/utils';

const selectIngredientsEntities = (state: TRootState) => ingredientsSelectors.selectEntities(state);

const selectBurgerSlice = (state: TRootState): TBurgerSlice => state.burger;
const selectIngredientsIds = (state: TRootState) => selectBurgerSlice(state).ingredients;
const selectBunId = (state: TRootState) => selectBurgerSlice(state).bun;
const selectCounts = (state: TRootState) => selectBurgerSlice(state).counts;

const selectCountById = (id: TIngredientId) => {
  return createSelector(selectCounts, (counts) => counts[id] ?? 0);
};

const selectBunIngredient = createSelector(
  [selectBunId, selectIngredientsEntities],
  (bunId, ingredientsEntities) => {
    return ingredientsEntities[bunId];
  }
);

const selectIngredients = createSelector(
  [selectIngredientsIds, selectIngredientsEntities],
  (ids, entities) => {
    return ids
      .map(({ id, uid }) => {
        const data = entities[id];
        return !!data ? { id, uid, data: entities[id] } : null;
      })
      .filter((i): i is TBurgerIngredient => !!i);
  }
);

const selectIsBunSelected = createSelector(selectBunIngredient, (bun) => !!bun);

const selectTotalPrice = createSelector(
  [selectBunIngredient, selectIngredients],
  (bun, ingredients) => {
    return (
      2 * (bun?.price ?? 0) +
      sumBy(
        ingredients.map(({ data }) => data),
        (i) => i.price
      )
    );
  }
);

const burgerSelectors = {
  selectBunIngredient,
  selectBunId,
  selectCountById,
  selectIngredients,
  selectIngredientsIds,
  selectIsBunSelected,
  selectTotalPrice,
  selectBurgerSlice,
};

export default burgerSelectors;
