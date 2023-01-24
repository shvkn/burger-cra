import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsLayout from 'components/details-layout';
import styles from './user-order.module.css';
import OrderInfo from 'components/order-info';
import useUserOrders from 'hooks/use-user-orders';

function UserOrderPage() {
  const { id } = useParams();
  const [, entities] = useUserOrders();
  const order = entities[id];
  return order ? (
    <main className={`mt-30 ${styles.layout}`}>
      <DetailsLayout>
        <DetailsLayout.Header>
          <p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
        </DetailsLayout.Header>
        <DetailsLayout.Content>
          <OrderInfo order={order} />
        </DetailsLayout.Content>
      </DetailsLayout>
    </main>
  ) : null;
}

export default UserOrderPage;
