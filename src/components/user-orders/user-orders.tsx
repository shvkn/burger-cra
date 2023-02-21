import React, { FC, useEffect } from 'react';
import styles from 'pages/profile/profile.module.css';
import Order from 'components/order';
import { useAppDispatch, useAppSelector } from 'services/slices';
import userOrdersSelectors from 'services/selectors/user-orders';
import actions from 'services/actions/user-orders';

const UserOrders: FC = () => {
  const orders = useAppSelector(userOrdersSelectors.selectAll);
  const isWsOpened = useAppSelector(userOrdersSelectors.selectIsWSOpened);
  const isWsClosed = useAppSelector(userOrdersSelectors.selectIsWSClosed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    isWsClosed && dispatch(actions.connect());
    return () => {
      isWsOpened && dispatch(actions.close());
    };
  }, [dispatch, isWsClosed, isWsOpened]);

  return (
    <ul className={`${styles.ordersList} scroll`}>
      {orders.map((order) => {
        return (
          <li key={order._id} className={'mb-4 mr-2'}>
            <Order order={order} />
          </li>
        );
      })}
    </ul>
  );
};

export default UserOrders;
