import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ingredientModel } from 'entities/ingredient';
import { OrderInfo, ordersModel } from 'entities/order';

import { getOrderIngredients, useAppDispatch } from 'shared/lib';
import { DetailsLayout } from 'shared/ui';

import styles from './styles.module.css';

export const OrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ordersModel.actions.connect({ route: '/orders/all' }));
    return () => {
      dispatch(ordersModel.actions.close());
    };
  }, [dispatch]);

  const order = useSelector(ordersModel.selectors.selectOrderById(id));
  const { entities } = ingredientModel.useIngredients();
  const mapIngredientsFn = (order: TOrder) => getOrderIngredients(order, entities);
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
