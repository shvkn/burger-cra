import { createAction } from '@reduxjs/toolkit';

export const connect = createAction('orders/websocket/connect');
export const open = createAction('orders/websocket/open');
export const close = createAction('orders/websocket/close');
export const getMessage = createAction('orders/websocket/get-message');
export const sendMessage = createAction('orders/websocket/send-message');
