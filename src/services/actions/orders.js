import { createAction } from '@reduxjs/toolkit';

const connect = createAction('orders/ws-connect');
const open = createAction('orders/ws-open');
const close = createAction('orders/ws-close');
const getMessage = createAction('orders/ws-getMessage');
const sendMessage = createAction('orders/ws-sendMessage');

const ordersWsActions = {
  close,
  connect,
  getMessage,
  open,
  sendMessage,
};

export default ordersWsActions;
