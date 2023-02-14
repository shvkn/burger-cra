import { TWebSocketActions } from 'services/types';
import { Middleware } from 'redux';

const WebSocketMiddleware = (wsUrl: string, wsActions: TWebSocketActions): Middleware => {
  let socket: WebSocket | null = null;
  return (store) => (next) => (action) => {
    const { payload } = action;
    if (wsActions.connect.match(action)) {
      const accessToken = payload?.accessToken;
      const url = accessToken ? `${wsUrl}?token=${accessToken}` : wsUrl;
      socket = new WebSocket(url);
    }
    if (socket) {
      socket.onopen = (event: Event) => {
        store.dispatch(wsActions.onOpen(event.type));
      };
      socket.onclose = (event: CloseEvent) => {
        store.dispatch(wsActions.onClose(event.type));
      };
      socket.onmessage = (event: MessageEvent) => {
        const { data } = event;
        store.dispatch(wsActions.onGetMessage(JSON.parse(data)));
      };
      if (wsActions.close.match(action)) {
        socket.close();
      }
      if (wsActions.sendMessage.match(action)) {
        socket.send(JSON.stringify(payload));
      }
    }
    next(action);
  };
};

export default WebSocketMiddleware;
