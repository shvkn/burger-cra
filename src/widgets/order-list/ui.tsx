import React from 'react';
import styles from './styles.module.css';
import { ModalRoute } from 'features/modal-route';
import { Order } from 'entities/order';
import { getOrderIngredients } from 'utils/utils';
import { ingredientModel } from 'entities/ingredient';
import { useRouteMatch } from 'react-router-dom';
import { clsx } from 'clsx';

type TOrderListParams = {
  orders: TOrder[];
  heading?: React.ReactNode;
  extraClass?: string;
};

const MemoizedOrder = React.memo(Order);

export const OrderList: React.FC<TOrderListParams> = ({ orders, heading, extraClass }) => {
  const { entities } = ingredientModel.useIngredients();
  const { url } = useRouteMatch();
  const mapIngredientsFn = (order: TOrder) => getOrderIngredients(order, entities);
  return !!orders.length ? (
    <div className={styles.container}>
      {heading && heading}
      <ul className={clsx(styles.ordersList, 'scroll', extraClass)}>
        {orders.map((order) => (
          <li key={order._id} className={'mb-4 mr-2'}>
            <ModalRoute path={`${url}/${order._id}`}>
              <MemoizedOrder order={order} mapIngredientsFn={mapIngredientsFn} hideStatus />
            </ModalRoute>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p className={`text text_type_main-medium text_color_inactive ${styles.message}`}>
      Здесь пока пусто
    </p>
  );
};
