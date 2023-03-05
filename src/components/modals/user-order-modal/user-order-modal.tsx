import React, { FC } from 'react';
import { Modal } from 'shared/ui';
import OrderInfo from 'components/order-info';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userOrdersSelectors from 'services/selectors/user-orders';
import { useAppHistory } from 'shared/lib';

const UserOrderModal: FC = () => {
  const { id } = useParams<{ id: string }>();
  const order = useSelector(userOrdersSelectors.selectById(id));
  const history = useAppHistory();

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

export default UserOrderModal;
