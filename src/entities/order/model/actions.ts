import { createAction } from '@reduxjs/toolkit';

type TConnectPayload = {
  accessToken?: string;
  route: string;
};

const withPayloadType =
  <T>() =>
  (t: T) => ({ payload: t });

export const onOpen = createAction('orders/ws/onOpen');
export const onGetMessage = createAction(
  'orders/ws/onGetMessage',
  withPayloadType<TOrderWsMessage>()
);
export const onClose = createAction('orders/ws/onClose');
export const close = createAction('orders/ws/close');

export const connect = createAction('orders/ws/connect', withPayloadType<TConnectPayload>());
export const sendMessage = createAction('orders/ws/sendMessage');
