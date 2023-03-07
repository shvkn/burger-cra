const dict: Record<TOrderStatus, string> = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'В работе',
};

export const getOrderStatus = (status: TOrderStatus) => dict[status];

export const calcTotalPrice = (ingredientsList: readonly TIngredient[]) =>
  ingredientsList.reduce((total, { type, price }) => {
    return total + (type === 'bun' ? 2 * price : price);
  }, 0);
