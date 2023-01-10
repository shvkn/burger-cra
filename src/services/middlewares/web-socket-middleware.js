const WebSocketMiddleware = (wsUrl, wsActions) => {
  let socket = null;
  return (store) => (next) => (action) => {
    if (wsActions.connect.match(action)) {
      socket = new WebSocket(wsUrl);
    }
    if (socket) {
      socket.onopen = (event) => {
        store.dispatch(wsActions.open(event.type));
      };
      socket.onclose = (event) => {
        store.dispatch(wsActions.close(event.type));
      };
      socket.onmessage = (event) => {
        const { data } = event;
        store.dispatch(wsActions.getMessage(JSON.parse(data)));
      };
      if (wsActions.sendMessage.match(action)) {
        const { payload } = action;
        socket.send(JSON.stringify(payload));
      }
    }
    next(action);
  };
};

export default WebSocketMiddleware;
