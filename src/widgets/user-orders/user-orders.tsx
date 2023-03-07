import React, { useEffect } from 'react';

import { OrderList } from 'widgets/order-list';

import { authModel } from 'entities/auth';
import { ingredientModel } from 'entities/ingredient';
import { ordersModel } from 'entities/order';

import { getAccessToken, useAppDispatch } from 'shared/lib';
import { LoadingCurtain } from 'shared/ui';

export const UserOrders: React.FC = () => {
  const { entities: ingredientsEntities } = ingredientModel.useIngredients();
  const { orders, isWsOpened, isWsClosed, isWsConnecting } = ordersModel.useOrders({
    ingredientsEntities,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authModel.actions.getUser())
      .unwrap()
      .then(() => {
        isWsClosed &&
          dispatch(
            ordersModel.actions.connect({
              route: '/orders',
              accessToken: getAccessToken(),
            })
          );
      });

    return () => {
      isWsOpened && dispatch(ordersModel.actions.close());
    };
  }, [dispatch, isWsOpened, isWsClosed]);

  return isWsConnecting ? <LoadingCurtain /> : <OrderList orders={orders} />;
};
