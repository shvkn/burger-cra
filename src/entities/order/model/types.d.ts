declare type TOrderEntity = Omit<TOrder, 'ingredients'> & { ingredients: readonly TIngredient[] };
