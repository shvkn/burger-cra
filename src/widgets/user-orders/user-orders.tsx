import React from 'react';
import { ordersModel } from 'entities/order';
import { OrderList } from 'widgets/order-list';
import { LoadingCurtain } from 'shared/ui';
import { getAccessToken, useAppDispatch } from 'shared/lib';

export const UserOrders: React.FC = () => {
  const { orders, isWsOpened, isWsClosed, isWsConnecting } = ordersModel.useOrders();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    isWsClosed &&
      dispatch(
        ordersModel.actions.connect({
          route: '/orders',
          accessToken: getAccessToken(),
        })
      );
    return () => {
      isWsOpened && dispatch(ordersModel.actions.close());
    };
  }, [dispatch, isWsOpened, isWsClosed]);

  return isWsConnecting ? <LoadingCurtain /> : <OrderList orders={orders} />;
};