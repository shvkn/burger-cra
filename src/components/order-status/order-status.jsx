import React from 'react';
import PropTypes from 'prop-types';
import { OrderStatuses } from '../../utils/constants';

function OrderStatus({ status, className = '' }) {
  let value;
  switch (status) {
    case 'done':
      value = 'Выполнен';
      break;
    case 'created':
      value = 'Создан';
      break;
    case 'pending':
      value = 'В работе';
      break;
    default:
      value = status;
  }
  return <div className={className}>{value}</div>;
}

OrderStatus.propTypes = {
  status: PropTypes.oneOf(Object.values(OrderStatuses)).isRequired,
  className: PropTypes.string,
};

export default OrderStatus;
