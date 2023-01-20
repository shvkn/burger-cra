import React from 'react';
import DetailsLayout from 'components/details-layout/details-layout';
import OrderInfo from 'components/order-info/order-info';
import { orderPropTypes } from 'utils/prop-types';
import styles from './order.module.css';

function OrderPage({ order }) {
  return (
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
  );
}

OrderPage.propTypes = {
  order: orderPropTypes.isRequired,
};

export default OrderPage;
