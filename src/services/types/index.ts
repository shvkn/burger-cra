import store from 'services/slices';
import { TUser } from 'services/types/data';
import { ActionCreatorWithOptionalPayload, SerializedError } from '@reduxjs/toolkit';

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
