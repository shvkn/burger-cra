import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from 'components/modal';
import OrderInfo from 'components/order-info';
import ordersSelectors from 'services/selectors/orders';

function OrderModal() {
  const { id } = useParams();
  const entities = useSelector(ordersSelectors.selectEntities);
  const order = entities[id];
  const history = useHistory();

  const handleClose = () => {
    history.goBack();
  };

  return order ? (
    <Modal handleClose={handleClose}>
      <Modal.Header>
        <p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
      </Modal.Header>
      <Modal.Content>
        <OrderInfo order={order} />
      </Modal.Content>
    </Modal>
  ) : null;
}

export default OrderModal;
