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
  readonly onOpen: ActionCreatorWithOptionalPayload<any>;
  readonly onGetMessage: ActionCreatorWithOptionalPayload<any>;
  readonly onClose: ActionCreatorWithOptionalPayload<any>;
  readonly close: ActionCreatorWithOptionalPayload<any>;
  readonly connect: ActionCreatorWithOptionalPayload<any>;
  readonly sendMessage: ActionCreatorWithOptionalPayload<any>;
};

export type TPatchUserData = {
  readonly password?: string;
} & { [k in keyof TUser]?: TUser[k] };

export type TLoginParams = {
  readonly email: string;
  readonly password: string;
};

export type TRegisterParams = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
};

export type TResetPasswordParams = {
  readonly token: string;
  readonly password: string;
};

export type TGetResetCodeParams = {
  readonly email: string;
};

export type TKeySuccessFalse = {
  readonly success: false;
};

export type TBurgerIngredient = {
  readonly id: TIngredientId;
  readonly uid: string;
  readonly data: TIngredient;
};

export type TLocationState = {
  readonly from?: Location;
  readonly burger?: TBurgerSlice;
  readonly background?: Location;
} & LocationState;

export type TDndSortableItem = {
  index: number;
};

export type TRouteItem = {
  readonly path: string;
  readonly title: string;
  readonly exact?: boolean;
  readonly sidebar?: string;
  readonly children?: ReactNode;
};

export type TAuthTokens = {
  readonly accessToken: string | undefined;
  readonly refreshToken: string | undefined;
};
