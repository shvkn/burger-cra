import { createAction } from '@reduxjs/toolkit';

const connect = createAction('userOrders/ws-connect');
const open = createAction('userOrders/ws-open');
const close = createAction('userOrders/ws-close');
const getMessage = createAction('userOrders/ws-getMessage');
const sendMessage = createAction('userOrders/ws-sendMessage');

const userOrdersWsActions = {
  close,
  connect,
  getMessage,
  open,
  sendMessage,
};

export default userOrdersWsActions;
