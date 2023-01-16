import { createSelector } from '@reduxjs/toolkit';
import { getRefreshToken } from './utils';
import ingredientsSelectors from '../services/selectors/ingredients';
export const selectOrderSlice = (state) => state.order;

export const selectBurgerBun = (state) => state.burger.bun;
export const selectBurgerIngredients = (state) => state.burger.ingredients;
export const selectBurgerCounts = (state) => state.burger.counts;
export const selectIngredientCountById = (id) =>
  createSelector([selectBurgerCounts], (counts) => {
    return counts[id] || 0;
  });

export const selectOrderNumber = (state) => selectOrderSlice(state).number;

export const selectTotalPrice = createSelector(
  [selectBurgerBun, selectBurgerIngredients, ingredientsSelectors.selectEntities],
  (bunId, ingredients, ingredientsEntities) =>
    ingredients
      .map(({ id }) => ingredientsEntities[id].price)
      .reduce((total, price) => total + price, 0) +
    (bunId ? ingredientsEntities[bunId].price * 2 : 0)
);

export const selectIsBurgerBunEmpty = createSelector(selectBurgerBun, (bun) => bun === null);
export const selectIsBurgerIngredientsEmpty = createSelector(
  selectBurgerIngredients,
  (ingredients) => ingredients.length === 0
);

export const selectUser = (state) => state.auth.user;
export const selectAuth = (state) => state.auth;
export const selectIsUserAuthorized = createSelector(selectAuth, (auth) => {
  const refreshToken = getRefreshToken();
  return auth.user !== null;
});
