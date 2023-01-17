import React from 'react';
import Details from 'layout/details/details';
import OrderInfo from 'components/order-info/order-info';
import { orderPropTypes } from 'utils/prop-types';

function OrderPage({ order }) {
  return (
    <Details>
      <Details.Header>
        <p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
      </Details.Header>
      <Details.Content>
        <OrderInfo order={order} />
      </Details.Content>
    </Details>
  );
}

OrderPage.propTypes = {
  order: orderPropTypes.isRequired,
};

export default OrderPage;
