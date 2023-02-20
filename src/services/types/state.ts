import { TError } from 'services/types/index';
import { TIngredientId, TUser } from 'services/types/data';

export type TThunkState = {
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: TError;
};
export type TWebSocketSate = {
  status: 'closed' | 'opened' | 'connecting';
  isConnected: boolean;
  error: TError;
};
export type TOrdersSlice = {
  total: number;
  totalToday: number;
};

export type TUserOrdersSlice = TOrdersSlice;

export type TAuthSlice = {
  user: TUser | null;
  isAuthorized: boolean;
} & TThunkState;

export type TIngredientsSlice = TThunkState;

export type TBurgerSlice = {
  bun: TIngredientId;
  ingredients: Array<{
    id: TIngredientId;
    uid: string;
  }>;
  counts: { [name: string]: number };
};
