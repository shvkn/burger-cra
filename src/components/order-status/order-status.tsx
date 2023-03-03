import React, { FC } from 'react';

const dict: Record<TOrderStatus, string> = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'В работе',
};

type TOrderStatusProps = {
  status: TOrderStatus;
};

const OrderStatus: FC<TOrderStatusProps> = ({ status }) => {
  return <span>{dict[status]}</span>;
};

export default OrderStatus;
