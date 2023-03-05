import { configureStore } from '@reduxjs/toolkit';
import order from 'services/slices/order';
import userOrders from 'services/slices/user-orders';
import WebSocketMiddleware from 'services/middlewares/web-socket-middleware';
import { NORMA_WS_API } from 'utils/constants';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ingredientModel } from 'entities/ingredient';
import { authModel } from 'entities/auth';
import { burgerModel } from 'entities/burger';
import { ordersModel } from 'entities/order';

export default configureStore({
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

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useAppHistory = () => useHistory<TLocationState>();
export const useAppLocation = () => useLocation<TLocationState>();
