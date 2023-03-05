import { configureStore } from '@reduxjs/toolkit';
import order from 'services/slices/order';
import userOrders from 'services/slices/user-orders';
import WebSocketMiddleware from 'services/middlewares/web-socket-middleware';
import { NORMA_WS_API } from 'utils/constants';
import { ingredientModel } from 'entities/ingredient';
import { authModel } from 'entities/auth';
import { burgerModel } from 'entities/burger';
import { ordersModel } from 'entities/order';

export const store = configureStore({
  reducer: {
    ingredients: ingredientModel.reducer,
    order,
    burger: burgerModel.reducer,
    auth: authModel.reducer,
    orders: ordersModel.reducer,
    userOrders,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(WebSocketMiddleware(NORMA_WS_API, ordersModel.actions)),
});
