import store from 'services/slices';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { TIngredient, TOrder } from 'services/types/data';
import { ActionCreatorWithOptionalPayload, SerializedError } from '@reduxjs/toolkit';

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export type TError = SerializedError;

export type TThunkState = {
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: TError;
};

export type TWebSocketSate = {
  status: 'closed' | 'opened' | 'connecting';
  isConnected: boolean;
  error: TError;
};

export type TBaseResponseBody = {
  success: boolean;
  message?: string;
};

export type TIngredientsResponseBody = {
  data: ReadonlyArray<TIngredient>;
} & TBaseResponseBody;

export type TOrdersResponseBody = {
  orders: ReadonlyArray<TOrder>;
  total: number;
  totalToday: number;
} & TBaseResponseBody;

export type TOrderResponseBody = {
  order: TOrder;
} & TBaseResponseBody;

export type TOrdersState = {
  total: number;
  totalToday: number;
};

export type TOrderWsMessage = {
  readonly orders: ReadonlyArray<TOrder>;
  readonly total: number;
  readonly totalToday: number;
} & TBaseResponseBody;

export type TWebSocketActions = {
  onOpen: ActionCreatorWithOptionalPayload<any>;
  onGetMessage: ActionCreatorWithOptionalPayload<any>;
  onClose: ActionCreatorWithOptionalPayload<any>;
  close: ActionCreatorWithOptionalPayload<any>;
  connect: ActionCreatorWithOptionalPayload<any>;
  sendMessage: ActionCreatorWithOptionalPayload<any>;
};

export type TUser = {
  name: string;
  email: string;
};

export type TUserResponseBody = TUser & TBaseResponseBody;

export type TPatchUserData = {
  password?: string;
} & { [k in keyof TUser]?: TUser[k] };

export type TAuthResponseBody = {
  accessToken: string;
  refreshToken: string;
  user?: TUser;
} & TBaseResponseBody;

export type TLoginParams = {
  email: string;
  password: string;
};
export type TRegisterParams = {
  name: string;
  email: string;
  password: string;
};
export type TResetPasswordParams = {
  token: string;
  password: string;
};
export type TGetResetCodeParams = {
  email: string;
};
