import { createAction } from '@reduxjs/toolkit';

export const connect = createAction('userOrders/websocket/connect');
export const open = createAction('userOrders/websocket/open');
export const close = createAction('userOrders/websocket/close');
export const getMessage = createAction('userOrders/websocket/get-message');
export const sendMessage = createAction('userOrders/websocket/send-message');

const userOrdersWsActions = {
  close,
  connect,
  getMessage,
  open,
  sendMessage,
};

export default userOrdersWsActions;
