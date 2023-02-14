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

export type TResponseBody<T> = {
  success: boolean;
  message?: string;
} & T;

export type TIngredientsResponse = {
  data: ReadonlyArray<TIngredient>;
};

export type TOrdersResponse = {
  orders: ReadonlyArray<TOrder>;
  total: number;
  totalToday: number;
};

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
