import { createAction } from '@reduxjs/toolkit';
import { getAccessToken } from 'utils/utils';
import { TOrderWsMessage, TWebSocketActions } from 'services/types';

export const onOpen = createAction('userOrders/websocket/on-open');
export const onGetMessage = createAction<TOrderWsMessage>('userOrders/websocket/on-get-message');
export const onClose = createAction('userOrders/websocket/on-close');
export const close = createAction('userOrders/websocket/close');
export const connect = createAction('userOrders/websocket/connect', () => {
  // TODO Проверять AccessToken
  return { payload: { accessToken: getAccessToken() } };
});
export const sendMessage = createAction('userOrders/websocket/send-message');

const actions: TWebSocketActions = {
  onOpen,
  onGetMessage,
  onClose,
  close,
  connect,
  sendMessage,
};

export default actions;
