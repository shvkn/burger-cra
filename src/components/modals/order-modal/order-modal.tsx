import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Modal from 'components/modal';
import OrderInfo from 'components/order-info';
import ordersSelectors from 'services/selectors/orders';
import { useAppSelector } from 'shared/lib';

const OrderModal: FC = () => {
  const { id } = useParams<{ id: string }>();
  const order = useAppSelector(ordersSelectors.selectOrderById(id));
  const history = useHistory();

  const handleClose = () => {
    history.goBack();
  };

  return order ? (
    <Modal handleClose={handleClose}>
      <Modal.Header handleClose={handleClose}>
        <p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
      </Modal.Header>
      <Modal.Content>
        <OrderInfo order={order} />
      </Modal.Content>
    </Modal>
  ) : null;
};

export default OrderModal;
