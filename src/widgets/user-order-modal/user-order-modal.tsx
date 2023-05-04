import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ingredientModel } from 'entities/ingredient';
import { OrderInfo, ordersModel } from 'entities/order';

import { getOrderIngredients, useAppHistory } from 'shared/lib';
import { Modal } from 'shared/ui';

export const UserOrderModal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const order = useSelector(ordersModel.selectors.selectById(id));
  const history = useAppHistory();

  const handleClose = () => {
    history.goBack();
  };
  const { entities } = ingredientModel.useIngredients();
  const mapIngredientsFn = (order: TOrder) => getOrderIngredients(order, entities);
  return order ? (
    <Modal handleClose={handleClose}>
      <Modal.Header handleClose={handleClose}>
        <p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
      </Modal.Header>
      <Modal.Content>
        <OrderInfo order={order} mapIngredientsFn={mapIngredientsFn} />
      </Modal.Content>
    </Modal>
  ) : null;
};
