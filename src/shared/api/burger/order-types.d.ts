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
declare type TOrderResponseBody = {
  readonly order?: TOrder;
} & TBaseResponseBody;
