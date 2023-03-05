import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ingredientModel } from 'entities/ingredient';
import { OrderInfo, ordersModel } from 'entities/order';

import { getAccessToken, getOrderIngredients, useAppDispatch, useAppSelector } from 'shared/lib';
import { DetailsLayout } from 'shared/ui';

import styles from './styles.module.css';

export const UserOrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const isWsOpened = useAppSelector(ordersModel.selectors.selectIsWSOpened);
  const isWsClosed = useAppSelector(ordersModel.selectors.selectIsWSClosed);

  useEffect(() => {
    dispatch(ingredientModel.actions.getIngredientsAsync());
    isWsClosed &&
      dispatch(ordersModel.actions.connect({ route: '/orders', accessToken: getAccessToken() }));
    return () => {
      isWsOpened && dispatch(ordersModel.actions.close());
    };
  }, [dispatch, isWsClosed, isWsOpened]);
  const { entities } = ingredientModel.useIngredients();
  const mapIngredientsFn = (order: TOrder) => getOrderIngredients(order, entities);
  const order = useSelector(ordersModel.selectors.selectById(id));
  return order ? (
    <main className={`mt-30 ${styles.layout}`}>
      <DetailsLayout>
        <DetailsLayout.Header>
          <p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
        </DetailsLayout.Header>
        <DetailsLayout.Content>
          <OrderInfo order={order} mapIngredientsFn={mapIngredientsFn} />
        </DetailsLayout.Content>
      </DetailsLayout>
    </main>
  ) : null;
};
