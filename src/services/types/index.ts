import store from 'services/slices';
import { TIngredient, TIngredientId, TUser } from 'services/types/data';
import { ActionCreatorWithOptionalPayload, SerializedError } from '@reduxjs/toolkit';
import { Location, LocationState } from 'history';
import { TBurgerSlice } from 'services/types/state';
import { ReactNode } from 'react';

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type TError = SerializedError;

export type TWebSocketActions = {
  onOpen: ActionCreatorWithOptionalPayload<any>;
  onGetMessage: ActionCreatorWithOptionalPayload<any>;
  onClose: ActionCreatorWithOptionalPayload<any>;
  close: ActionCreatorWithOptionalPayload<any>;
  connect: ActionCreatorWithOptionalPayload<any>;
  sendMessage: ActionCreatorWithOptionalPayload<any>;
};

export type TPatchUserData = {
  password?: string;
} & { [k in keyof TUser]?: TUser[k] };

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

export type TKeySuccessFalse = {
  success: false;
};
export type TBurgerIngredient = {
  id: TIngredientId;
  uid: string;
  data: TIngredient;
};

export type TLocationState = {
  from?: Location;
  burger?: TBurgerSlice;
  background?: Location;
} & LocationState;
export type TDndSortableItem = {
  index: number;
};
export type TRouteItem = {
  path: string;
  title: string;
  exact?: boolean;
  sidebar?: string;
  children?: ReactNode;
};
