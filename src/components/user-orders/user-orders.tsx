import React from 'react';
import { useAppDispatch } from 'services/slices';
import { ordersModel } from 'entities/order';
import { getAccessToken } from 'utils/utils';
import { OrderList } from 'widgets/order-list';
import LoadingCurtain from 'components/loading-curtain/loading-curtain';

const UserOrders: React.FC = () => {
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

export default UserOrders;
