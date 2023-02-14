import store from 'services/slices';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { TIngredient, TOrder } from 'services/types/data';
import { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit';

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export type TThunkState = {
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: {} | null;
};

export type TWebSocketSate = {
  status: 'closed' | 'opened' | 'connecting';
  isConnected: boolean;
  error: {} | null;
};

export type TResponseBaseBody = {
  success: boolean;
  message?: string;
};

export type TIngredientsResponseBody = {
  data: ReadonlyArray<TIngredient>;
} & TResponseBaseBody;

export type TOrdersResponseBody = {
  orders: ReadonlyArray<TOrder>;
  total: number;
  totalToday: number;
} & TResponseBaseBody;

export type TOrdersState = {
  total: number;
  totalToday: number;
};

export type TWebSocketActions = {
  onOpen: ActionCreatorWithOptionalPayload<any>;
  onGetMessage: ActionCreatorWithOptionalPayload<any>;
  onClose: ActionCreatorWithOptionalPayload<any>;
  close: ActionCreatorWithOptionalPayload<any>;
  connect: ActionCreatorWithOptionalPayload<any>;
  sendMessage: ActionCreatorWithOptionalPayload<any>;
};
