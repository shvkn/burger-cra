import { Middleware } from 'redux';

const WebSocketMiddleware = (wsUrl: string, wsActions: TWebSocketActions): Middleware => {
  let socket: WebSocket | null = null;
  return (store) => (next) => (action) => {
    const { payload } = action;
    if (wsActions.connect.match(action)) {
      if (socket === null) {
        const { route, accessToken } = payload;
        const url = accessToken ? `${wsUrl}${route}?token=${accessToken}` : `${wsUrl}${route}`;
        socket = new WebSocket(url);
      }
    }
    if (socket) {
      socket.onopen = (event: Event) => {
        store.dispatch(wsActions.onOpen(event.type));
      };
      socket.onclose = (event: CloseEvent) => {
        store.dispatch(wsActions.onClose(event.type));
        socket = null;
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
