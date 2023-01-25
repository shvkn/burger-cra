import React from 'react';
import PropTypes from 'prop-types';
import { OrderStatuses } from 'utils/constants';

const dict = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'В работе',
};

function OrderStatus({ status }) {
  return <span>{dict[status.toLowerCase()]}</span>;
}

OrderStatus.propTypes = {
  status: PropTypes.oneOf(Object.values(OrderStatuses)).isRequired,
};

export default OrderStatus;
