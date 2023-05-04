import { configureStore } from '@reduxjs/toolkit';
import { DevToolsEnhancerOptions } from '@reduxjs/toolkit/src/devtoolsExtension';

import order from 'services/slices/order';

import { authModel } from 'entities/auth';
import { burgerModel } from 'entities/burger';
import { ingredientModel } from 'entities/ingredient';
import { ordersModel } from 'entities/order';

import { NORMA_WS_API } from 'shared/config';

import { WebSocketMiddleware } from './middlewares';
// TODO .env
const dt: DevToolsEnhancerOptions = { actionCreators: authModel.actions };

export const store = configureStore({
  reducer: {
    ingredients: ingredientModel.reducer,
    order,
    burger: burgerModel.reducer,
    auth: authModel.reducer,
    orders: ordersModel.reducer,
  },
  devTools: dt,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(WebSocketMiddleware(NORMA_WS_API, ordersModel.actions)),
});
