import { TWebSocketActions } from 'services/types';
import { Middleware } from 'redux';

const WebSocketMiddleware = (wsUrl: string, wsActions: TWebSocketActions): Middleware => {
  let socket: WebSocket | null = null;
  let connectionAttempts = 0;
  const MaxConnectionAttempts = 3;
  return (store) => (next) => (action) => {
    const { payload } = action;
    if (connectionAttempts < MaxConnectionAttempts && wsActions.connect.match(action)) {
      if (socket === null) {
        const accessToken = payload?.accessToken;
        const url = accessToken ? `${wsUrl}?token=${accessToken}` : wsUrl;
        socket = new WebSocket(url);
      }
    }
    if (socket) {
      socket.onopen = (event: Event) => {
        store.dispatch(wsActions.onOpen(event.type));
        connectionAttempts = 0;
      };
      socket.onclose = (event: CloseEvent) => {
        store.dispatch(wsActions.onClose(event.type));
        socket = null;
        connectionAttempts = connectionAttempts + 1;
      };
      socket.onmessage = (event: MessageEvent) => {
        const { data } = event;
        store.dispatch(wsActions.onGetMessage(JSON.parse(data)));
      };
      if (wsActions.sendMessage.match(action)) {
        socket.send(JSON.stringify(payload));
      }
      if (wsActions.close.match(action)) {
        socket.close();
        socket = null;
      }
    }
    next(action);
  };
};

export default WebSocketMiddleware;
