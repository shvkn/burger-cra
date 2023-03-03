declare type TRootState = ReturnType<typeof import('services/slices').default.getState>;
declare type AppDispatch = typeof import('services/slices').default.dispatch;
declare type SerializedError = import('@reduxjs/toolkit').SerializedError;
declare type TError = SerializedError;
type ActionCreatorWithOptionalPayload = import('@reduxjs/toolkit').ActionCreatorWithOptionalPayload;
declare type TWebSocketActions = {
  readonly onOpen: ActionCreatorWithOptionalPayload<any>;
  readonly onGetMessage: ActionCreatorWithOptionalPayload<any>;
  readonly onClose: ActionCreatorWithOptionalPayload<any>;
  readonly close: ActionCreatorWithOptionalPayload<any>;
  readonly connect: ActionCreatorWithOptionalPayload<any>;
  readonly sendMessage: ActionCreatorWithOptionalPayload<any>;
};

declare type TPatchUserData = {
  readonly password?: string;
} & { [k in keyof TUser]?: TUser[k] };

declare type TLoginParams = {
  readonly email: string;
  readonly password: string;
};

declare type TRegisterParams = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
};

declare type TResetPasswordParams = {
  readonly token: string;
  readonly password: string;
};

declare type TGetResetCodeParams = {
  readonly email: string;
};

declare type TKeySuccessFalse = {
  readonly success: false;
};

declare type TBurgerIngredient = {
  readonly id: TIngredientId;
  readonly uid: string;
  readonly data: TIngredient;
};

declare type TWebSocketSate = {
  status: 'closed' | 'opened' | 'connecting';
  isConnected: boolean;
  error: TError;
};

declare type TOrdersSlice = {
  total: number;
  totalToday: number;
};

declare type TUserOrdersSlice = TOrdersSlice;

declare type TAuthSlice = {
  user: TUser | null;
  isAuthorized: boolean;
} & TThunkState;

declare type TIngredientsSlice = TThunkState;

declare type TBurgerSlice = {
  bun: TIngredientId;
  ingredients: Array<{
    id: TIngredientId;
    uid: string;
  }>;
  counts: { [name: string]: number };
};

declare type TLocationState = {
  readonly from?: import('history').Location;
  readonly burger?: TBurgerSlice;
  readonly background?: import('history').Location;
} & import('history').LocationState;

declare type TDndSortableItem = {
  index: number;
};

declare type TRouteItem = {
  readonly path: string;
  readonly title: string;
  readonly exact?: boolean;
  readonly sidebar?: string;
  readonly children?: import('react').ReactNode;
};

declare type TAuthTokens = {
  readonly accessToken: string | undefined;
  readonly refreshToken: string | undefined;
};

declare type TThunkState = {
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: TError;
};

declare type TBaseResponseBody = {
  readonly success: boolean;
  readonly message?: string;
};

declare type TIngredientsResponseBody = {
  readonly data?: ReadonlyArray<TIngredient>;
} & TBaseResponseBody;

declare type TOrderResponseBody = {
  readonly order?: TOrder;
} & TBaseResponseBody;

declare type TUserResponseBody = {
  readonly user?: TUser;
} & TBaseResponseBody;

declare type TAuthResponseBody = {
  readonly accessToken?: string;
  readonly refreshToken?: string;
} & TBaseResponseBody;

declare type TOrderWsMessage = {
  readonly orders?: ReadonlyArray<TOrder>;
  readonly total?: number;
  readonly totalToday?: number;
} & TBaseResponseBody;
