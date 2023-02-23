import { createAction, nanoid } from '@reduxjs/toolkit';
import { TIngredientId } from 'services/types/data';
import { TBurgerSlice } from 'services/types/state';

export const setBun = createAction('burger/set-bun', (id: TIngredientId) => ({ payload: id }));

export const addIngredient = createAction('burger/add-ingredient', (id: TIngredientId) => ({
  payload: { id, uid: nanoid() },
}));

export const removeIngredient = createAction('burger/remove-ingredient', (index: number) => ({
  payload: index,
}));

export const moveIngredient = createAction(
  'burger/move-ingredient',
  (hoverIndex: number, dragIndex: number) => ({
    payload: {
      hoverIndex,
      dragIndex,
    },
  })
);

export const reset = createAction('burger/reset');

export const setState = createAction('burger/set-state', (state: TBurgerSlice) => {
  return { payload: state };
});
