import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { ModalRoute } from 'features/modal-route';

import { authModel } from 'entities/auth';
import { ingredientModel } from 'entities/ingredient';
import { Order, ordersModel } from 'entities/order';

import { getAccessToken, useAppDispatch } from 'shared/lib';
import { LoadingCurtain } from 'shared/ui';

import styles from './styles.module.css';

export const UserOrders: React.FC = () => {
  const { entities: ingredientsEntities } = ingredientModel.useIngredients();
  const { orders, isWsOpened, isWsClosed, isWsConnecting, isEmpty } = ordersModel.useOrders({
    ingredientsEntities,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(ingredientModel.actions.getIngredientsAsync());
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

  const { url } = useRouteMatch();

  if (isWsConnecting) return <LoadingCurtain />;
  if (isEmpty) return null;
  return (
    <ul className={`${styles.ordersList} scroll`}>
      {orders.map((order) => (
        <li key={order._id} className={'mb-4 mr-2'}>
          <ModalRoute path={`${url}/${order._id}`}>
            <Order order={order} />
          </ModalRoute>
        </li>
      ))}
    </ul>
  );
};
