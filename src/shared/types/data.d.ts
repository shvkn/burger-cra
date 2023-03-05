declare type TIngredientId = string;
declare type TIngredientType = 'bun' | 'sauce' | 'main';
declare type TIngredient = {
  readonly _id: TIngredientId;
  readonly name: string;
  readonly type: TIngredientType;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
};
declare type TOrderStatus = 'done' | 'pending' | 'created';
declare type TOrder = {
  readonly _id: string;
  readonly number: number;
  readonly status: TOrderStatus;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly ingredients: ReadonlyArray<TIngredientId>;
};
declare type TUser = {
  readonly name: string;
  readonly email: string;
};
