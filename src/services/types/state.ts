import { TError } from 'services/types/index';
import { TIngredientId } from 'services/types/data';

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
  user: {};
  isAuthorized: boolean;
} & TThunkState;

export type TIngredientsSlice = TThunkState;

export type TBurgerSlice = {
  bun: string;
  ingredients: Array<{
    id: TIngredientId;
    uid: string;
  }>;
  counts: { [name: string]: number };
};
