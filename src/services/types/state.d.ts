import { TError } from 'services/types/index';

export type TThunkState = {
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: TError;
};
export type TWebSocketSate = {
  status: 'closed' | 'opened' | 'connecting';
  isConnected: boolean;
  error: TError;
};
export type TOrdersState = {
  total: number;
  totalToday: number;
};
export type TAuthState = {
  user: {};
  isAuthorized: boolean;
} & TThunkState;

export type TEntityAdapterState = {
  ids: [];
  entities: {};
};

export type TIngredientsState = TThunkState & TEntityAdapterState;
