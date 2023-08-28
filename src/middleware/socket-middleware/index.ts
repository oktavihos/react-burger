import type { AnyAction, Middleware, MiddlewareAPI } from 'redux';

import { getCurrentTimestamp } from '../../utils/datetime';
import { ACCESS_TOKEN_FIELD } from '../../config/api';
import { RootState, TAppDispatch } from '../../services/store';

export const socketMiddleware = (wsActions: any): Middleware => {
  return ((store: MiddlewareAPI<TAppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: AnyAction) => {
      const { dispatch } = store;
      const { type } = action;

      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage} = wsActions;
      const token = localStorage.getItem(ACCESS_TOKEN_FIELD);

      if (type === wsInit.type) {
        const url = action.payload + (token ? `?token=${token}` : '')
        socket = new WebSocket(url);
      }
      if (socket) {
        socket.onopen = () => {
            dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError());
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData: any = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch(onMessage({ ...restParsedData, timestamp: getCurrentTimestamp() }));
        };

        socket.onclose = event => {
          dispatch(onClose(event));
        };

        if (type === wsSendMessage.type) {
          socket.send(JSON.stringify({...action.payload, token: token}));
        }
      }

      next(action);
    };
  }) as Middleware;
};