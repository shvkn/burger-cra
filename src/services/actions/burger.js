import { nanoid } from '@reduxjs/toolkit';
import { initialState } from 'services/slices/burger';

export const setBun = (state, { payload: id }) => {
  delete state.counts[state.bun];
  state.bun = id;
  state.counts[id] = 2;
};
export const addIngredient = {
  reducer: (state, { payload: { id, uid } }) => {
    state.ingredients.push({ id, uid });
    state.counts[id] = state.counts[id] + 1 || 1;
  },
  prepare: (id) => {
    return { payload: { id, uid: nanoid() } };
  },
};
export const removeIngredient = (state, { payload: index }) => {
  const { id } = state.ingredients[index];
  state.ingredients.splice(index, 1);
  state.counts[id] = state.counts[id] - 1;
  if (state.counts[id] <= 0) delete state.counts[id];
};
export const moveIngredient = (state, { payload: { hoverIndex, dragIndex } }) => {
  const [dragElement] = state.ingredients.splice(dragIndex, 1);
  state.ingredients.splice(hoverIndex, 0, dragElement);
};
export const reset = (state) => (state = { ...initialState });
