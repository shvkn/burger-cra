import { createAction, nanoid } from '@reduxjs/toolkit';

export const setBun = createAction('burger/set-bun');
export const addIngredient = createAction('burger/add-ingredient', (id) => {
  return { payload: { id, uid: nanoid() } };
});
export const removeIngredient = createAction('burger/remove-ingredient');
export const moveIngredient = createAction('burger/move-ingredient');
export const reset = createAction('burger/reset');
