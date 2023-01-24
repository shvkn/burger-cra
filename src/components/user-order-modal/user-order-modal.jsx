import React from 'react';
import Modal from 'components/modal';
import OrderInfo from 'components/order-info';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userOrdersSelectors from 'services/selectors/user-orders';

function UserOrderModal() {
  const { id } = useParams();
  const entities = useSelector(userOrdersSelectors.selectEntities);
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

export default UserOrderModal;
