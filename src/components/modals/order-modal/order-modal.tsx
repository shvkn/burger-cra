import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from 'shared/ui';
import OrderInfo from 'components/order-info';
import { useAppSelector } from 'shared/lib';
import { ordersModel } from 'entities/order';

const OrderModal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const order = useAppSelector(ordersModel.selectors.selectOrderById(id));
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
