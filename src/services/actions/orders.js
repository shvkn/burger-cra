import { createAction } from '@reduxjs/toolkit';

export const onOpen = createAction('orders/websocket/on-open');
export const onGetMessage = createAction('orders/websocket/on-get-message');
export const onClose = createAction('orders/websocket/on-close');
export const close = createAction('orders/websocket/close');
export const connect = createAction('orders/websocket/connect');
export const sendMessage = createAction('orders/websocket/send-message');
