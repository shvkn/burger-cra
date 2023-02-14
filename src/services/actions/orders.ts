import { createAction } from '@reduxjs/toolkit';
import { TWebSocketActions } from 'services/types';

export const onOpen = createAction('orders/websocket/on-open');
export const onGetMessage = createAction('orders/websocket/on-get-message', (payload) => ({
  payload,
}));
export const onClose = createAction('orders/websocket/on-close');
export const close = createAction('orders/websocket/close');
export const connect = createAction('orders/websocket/connect');
export const sendMessage = createAction('orders/websocket/send-message');

const actions: TWebSocketActions = {
  onOpen,
  onGetMessage,
  onClose,
  close,
  connect,
  sendMessage,
};

export default actions;
