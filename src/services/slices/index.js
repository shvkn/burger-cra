import { configureStore } from '@reduxjs/toolkit';
import ingredients from './ingredients';
import burger from './burger';
import order from './order';
import auth from './auth';
import orders, { ordersWsActions } from './orders';
import userOrders, { userOrdersWsActions } from './user-orders';
import WebSocketMiddleware from 'services/middlewares/web-socket-middleware';

export default configureStore({
  reducer: {
    ingredients,
    order,
    burger,
    auth,
    orders,
    userOrders,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      WebSocketMiddleware('wss://norma.nomoreparties.space/orders/all', ordersWsActions),
      WebSocketMiddleware('wss://norma.nomoreparties.space/orders', userOrdersWsActions)
    ),
});
