import React, { useMemo } from 'react';
import styles from 'pages/profile/profile.module.css';
import Order from 'components/order';
import useUserOrders from 'hooks/use-user-orders';
import _ from 'lodash';

function UserOrders() {
  const [orders] = useUserOrders();
  const sortedOrders = useMemo(() => {
    return _.orderBy(orders, 'createdAt', 'desc');
  }, [orders]);

  return (
    <ul className={`${styles.ordersList} scroll`}>
      {sortedOrders.map((order) => {
        return (
          <li key={order._id} className={'mb-4 mr-2'}>
            <Order order={order} />
          </li>
        );
      })}
    </ul>
  );
}

export default UserOrders;
