import { Middleware } from 'redux';

export const WebSocketMiddleware = (wsUrl: string, wsActions: TWebSocketActions): Middleware => {
  let socket: WebSocket | null = null;
  return (store) => (next) => (action) => {
    const { payload } = action;

    function isCloseConnectionAction() {
      return wsActions.close.match(action);
    }

    function isSendMessageAction() {
      return wsActions.sendMessage.match(action);
    }

    function isConnectionAction() {
      return wsActions.connect.match(action);
    }

    if (!socket) {
      if (isConnectionAction()) {
        const { route, accessToken } = payload;
        const url = accessToken ? `${wsUrl}${route}?token=${accessToken}` : `${wsUrl}${route}`;
        socket = new WebSocket(url);
      }
    } else {
      socket.onopen = (event: Event) => {
        store.dispatch(wsActions.onOpen(event.type));
      };

      socket.onclose = (event: CloseEvent) => {
        store.dispatch(wsActions.onClose(event.type));
      };

      socket.onmessage = (event: MessageEvent) => {
        store.dispatch(wsActions.onGetMessage(JSON.parse(event.data)));
      };

      if (isSendMessageAction()) {
        socket.send(JSON.stringify(payload));
      }

      if (isCloseConnectionAction()) {
        socket.close();
        socket = null;
      }
    }
    next(action);
  };
};
