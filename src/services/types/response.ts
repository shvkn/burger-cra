import { TIngredient, TOrder, TUser } from 'services/types/data';

export type TBaseResponseBody = {
  readonly success: boolean;
  readonly message?: string;
};

export type TIngredientsResponseBody = {
  readonly data?: ReadonlyArray<TIngredient>;
} & TBaseResponseBody;

export type TOrderResponseBody = {
  readonly order?: TOrder;
} & TBaseResponseBody;

export type TUserResponseBody = {
  readonly user?: TUser;
} & TBaseResponseBody;

export type TAuthResponseBody = {
  readonly accessToken?: string;
  readonly refreshToken?: string;
} & TBaseResponseBody;

export type TOrderWsMessage = {
  readonly orders?: ReadonlyArray<TOrder>;
  readonly total?: number;
  readonly totalToday?: number;
} & TBaseResponseBody;
