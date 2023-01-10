import { configureStore } from '@reduxjs/toolkit';
import ingredients from './ingredients';
import burger from './burger';
import order from './order';
import auth from './auth';
import orders, { ordersWsActions } from './orders';
import WebSocketMiddleware from '../middlewares/web-socket-middleware';

export default configureStore({
  reducer: {
    ingredients,
    order,
    burger,
    auth,
    orders,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      WebSocketMiddleware('wss://norma.nomoreparties.space/orders/all', ordersWsActions)
    ),
});
