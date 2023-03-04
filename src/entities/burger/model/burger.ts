import {
  addIngredient,
  moveIngredient,
  removeIngredient,
  reset,
  setBun,
  setState,
} from './actions';
import { createSelector, createSlice, Dictionary } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { sumBy } from 'shared/lib';

const initialState: TBurgerSlice = {
  bun: '',
  ingredients: [],
  counts: {},
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addIngredient, (state, action) => {
        const { id, uid } = action.payload;
        state.ingredients.push({ id, uid });
        state.counts[id] = state.counts[id] + 1 || 1;
      })
      .addCase(setBun, (state, action) => {
        const id = action.payload;
        delete state.counts[state.bun];
        state.bun = id;
        state.counts[id] = 2;
      })
      .addCase(removeIngredient, (state, action) => {
        const index = action.payload;
        const { id } = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.counts[id] = state.counts[id] - 1;
        if (state.counts[id] < 1) delete state.counts[id];
      })
      .addCase(moveIngredient, (state, action) => {
        const { hoverIndex, dragIndex } = action.payload;
        const [dragElement] = state.ingredients.splice(dragIndex, 1);
        state.ingredients.splice(hoverIndex, 0, dragElement);
      })
      .addCase(setState, (state, action) => action.payload)
      .addCase(reset, () => initialState);
  },
});

export const { reducer } = burgerSlice;

const selectBurgerSlice = (state: TRootState) => state.burger;
const selectIngredientsIds = (state: TRootState) => selectBurgerSlice(state).ingredients;
const selectBunId = (state: TRootState) => selectBurgerSlice(state).bun;
const selectCounts = (state: TRootState) => selectBurgerSlice(state).counts;

const selectCountById = (id: TIngredientId) => {
  return createSelector(selectCounts, (counts) => counts[id] ?? 0);
};

const selectBunIngredient = (ingredientsEntities: Dictionary<TIngredient>) =>
  createSelector([selectBunId], (bunId) => ingredientsEntities[bunId]);

const selectIngredients = (ingredientsEntities: Dictionary<TIngredient>) =>
  createSelector([selectIngredientsIds], (ids) => {
    return ids
      .map(({ id, uid }) => {
        const data = ingredientsEntities[id];
        return !!data ? { id, uid, data } : null;
      })
      .filter((i): i is TBurgerIngredient => !!i);
  });

const selectIsBunSelected = (ingredientsEntities: Dictionary<TIngredient>) =>
  createSelector(selectBunIngredient(ingredientsEntities), (bun) => !!bun);

const selectIsIngredientsSelected = (ingredientsEntities: Dictionary<TIngredient>) =>
  createSelector(selectIngredients(ingredientsEntities), (ingredients) => !!ingredients.length);

const selectTotalPrice = (ingredientsEntities: Dictionary<TIngredient>) =>
  createSelector(
    [selectBunIngredient(ingredientsEntities), selectIngredients(ingredientsEntities)],
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

export const selectors = {
  selectBunIngredient,
  selectBunId,
  selectCountById,
  selectIngredients,
  selectIngredientsIds,
  selectIsBunSelected,
  selectIsIngredientsSelected,
  selectTotalPrice,
  selectBurgerSlice,
};

export const useBurger = ({
  ingredientsEntities,
}: {
  ingredientsEntities: Dictionary<TIngredient>;
}) => {
  const state = useSelector(selectBurgerSlice);
  const bun = useSelector(selectBunIngredient(ingredientsEntities));
  const ingredients = useSelector(selectIngredients(ingredientsEntities));
  const totalPrice = useSelector(selectTotalPrice(ingredientsEntities));
  const counts = useSelector(selectCounts);
  const isBunSelected = useSelector(selectIsBunSelected(ingredientsEntities));
  const isIngredientsSelected = useSelector(selectIsIngredientsSelected(ingredientsEntities));
  return {
    bun,
    state,
    ingredients,
    totalPrice,
    counts,
    isBunSelected,
    isIngredientsSelected,
  };
};
