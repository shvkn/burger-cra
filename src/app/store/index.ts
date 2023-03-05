import { configureStore } from '@reduxjs/toolkit';
import order from 'services/slices/order';
import { WebSocketMiddleware } from './middlewares';
import { ingredientModel } from 'entities/ingredient';
import { authModel } from 'entities/auth';
import { burgerModel } from 'entities/burger';
import { ordersModel } from 'entities/order';
import { NORMA_WS_API } from 'shared/config';

export const store = configureStore({
  reducer: {
    ingredients: ingredientModel.reducer,
    order,
    burger: burgerModel.reducer,
    auth: authModel.reducer,
    orders: ordersModel.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(WebSocketMiddleware(NORMA_WS_API, ordersModel.actions)),
});
