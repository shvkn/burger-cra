import { configureStore } from '@reduxjs/toolkit';
import ingredients from './ingredients';
import burger from './burger';
import order from './order';
import auth from './auth';
import orders from './orders';
import userOrders from './user-orders';
import WebSocketMiddleware from 'services/middlewares/web-socket-middleware';
import * as ordersWsActions from 'services/actions/orders';
import * as userOrdersWsActions from 'services/actions/user-orders';

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
