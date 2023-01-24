import React from 'react';
import DetailsLayout from 'components/details-layout/details-layout';
import OrderInfo from 'components/order-info/order-info';
import styles from './order.module.css';
import { useParams } from 'react-router-dom';
import useOrders from 'hooks/use-orders';
import { NotFoundedPage } from 'pages/index';

function OrderPage() {
  const { id } = useParams();
  const [, entities] = useOrders();
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
  ) : (
    <NotFoundedPage />
  );
}

export default OrderPage;
