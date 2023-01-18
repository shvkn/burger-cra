import { createAction, nanoid } from '@reduxjs/toolkit';

export const setBun = createAction('BURGER/SET_BUN');
export const addIngredient = createAction('BURGER/ADD_INGREDIENT', (id) => {
  return { payload: { id, uid: nanoid() } };
});
export const removeIngredient = createAction('BURGER/REMOVE_INGREDIENT');
export const moveIngredient = createAction('BURGER/MOVE_INGREDIENT');
export const reset = createAction('BURGER/RESET');
