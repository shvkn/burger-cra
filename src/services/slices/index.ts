import { configureStore } from '@reduxjs/toolkit';
import burger from 'services/slices/burger';
import order from 'services/slices/order';
import auth from 'services/slices/auth';
import orders from 'services/slices/orders';
import userOrders from 'services/slices/user-orders';
import WebSocketMiddleware from 'services/middlewares/web-socket-middleware';
import ordersWSActions from 'services/actions/orders';
import userOrdersWSActions from 'services/actions/user-orders';
import { NORMA_WS_API } from 'utils/constants';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ingredientModel } from 'entities/ingredient';

export default configureStore({
  reducer: {
    ingredients: ingredientModel.reducer,
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

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useAppHistory = () => useHistory<TLocationState>();
export const useAppLocation = () => useLocation<TLocationState>();
