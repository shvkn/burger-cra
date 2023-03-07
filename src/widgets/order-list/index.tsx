import { clsx } from 'clsx';
import React, { memo } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { ModalRoute } from 'features/modal-route';

import { Order } from 'entities/order';

import styles from './styles.module.css';

type TOrderListParams = {
  orders: TOrderEntity[];
  heading?: React.ReactNode;
  extraClass?: string;
};

const MemoizedOrder = memo(Order);

export const OrderList: React.FC<TOrderListParams> = ({ orders, heading, extraClass }) => {
  const { url } = useRouteMatch();
  return !!orders.length ? (
    <div className={styles.container}>
      {heading && heading}
      <ul className={clsx(styles.ordersList, 'scroll', extraClass)}>
        {orders.map((order) => (
          <li key={order._id} className={'mb-4 mr-2'}>
            <ModalRoute path={`${url}/${order._id}`}>
              <MemoizedOrder order={order} hideStatus />
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
