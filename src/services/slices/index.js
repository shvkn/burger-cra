import { configureStore } from '@reduxjs/toolkit';
import ingredients from 'services/slices/ingredients';
import burger from 'services/slices/burger';
import order from 'services/slices/order';
import auth from './auth';
import orders from './orders';
import userOrders from './user-orders';
import WebSocketMiddleware from 'services/middlewares/web-socket-middleware';
import * as ordersWSActions from 'services/actions/orders';
import * as userOrdersWSActions from 'services/actions/user-orders';
import { NORMA_WS_API } from 'utils/constants';

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
      WebSocketMiddleware(`${NORMA_WS_API}/orders/all`, ordersWSActions),
      WebSocketMiddleware(`${NORMA_WS_API}/orders`, userOrdersWSActions)
    ),
});
