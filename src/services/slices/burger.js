import { createSlice } from '@reduxjs/toolkit';
import {
  addIngredient,
  moveIngredient,
  removeIngredient,
  reset,
  setBun,
} from 'services/actions/burger';

const initialState = {
  bun: null,
  ingredients: [],
  counts: {},
};

const burger = createSlice({
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
        if (state.counts[id] <= 0) delete state.counts[id];
      })
      .addCase(moveIngredient, (state, action) => {
        const { hoverIndex, dragIndex } = action.payload;
        const [dragElement] = state.ingredients.splice(dragIndex, 1);
        state.ingredients.splice(hoverIndex, 0, dragElement);
      })
      .addCase(reset, () => initialState);
  },
});

export default burger.reducer;
