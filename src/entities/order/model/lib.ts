import { Dictionary } from '@reduxjs/toolkit';
import { groupBy, mapIdsToEntities, sumBy } from 'shared/lib';

export const getOrderIngredients = (
  order: TOrder,
  ingredientsEntities: Dictionary<TIngredient>
) => {
  try {
    const orderIngredients = mapIdsToEntities(order.ingredients, ingredientsEntities);
    const burger = groupBy(orderIngredients, (i) => {
      return i.type === 'bun' ? 'bun' : 'ingredients';
    });
    const bun = burger?.bun?.pop();
    const ingredients = burger?.ingredients;
    return !!bun
      ? !!ingredients?.length
        ? [bun, ...ingredients]
        : [bun]
      : !!ingredients?.length
      ? [...ingredients]
      : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getOrderTotalPrice = (order: TOrder, ingredientsEntities: Dictionary<TIngredient>) => {
  const orderIngredients = getOrderIngredients(order, ingredientsEntities);
  return sumBy(orderIngredients, (i) => {
    return i.type === 'bun' ? 2 * i.price : i.price;
  });
};
