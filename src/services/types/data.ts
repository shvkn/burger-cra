export type TIngredientId = string;
export type TIngredientType = 'bun' | 'sauce' | 'main';
export type TIngredient = {
  _id: TIngredientId;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};
