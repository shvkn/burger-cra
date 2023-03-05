import React, { FC, useEffect } from 'react';
import { DetailsLayout } from 'shared/ui';
import OrderInfo from 'entities/order/ui/order-info/order-info';
import styles from './order.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOrderIngredients, useAppDispatch } from 'shared/lib';
import { ordersModel } from 'entities/order';
import { ingredientModel } from 'entities/ingredient';

const OrderPage: FC = () => {
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

export default OrderPage;
