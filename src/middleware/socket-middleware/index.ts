import type { Middleware, MiddlewareAPI } from 'redux';

import { ACCESS_TOKEN_FIELD } from '../../config/api';
import { RootState, TAppActions, TAppDispatch } from '../../services/store';
import refreshToken from '../../api/refresh-token';

export const socketMiddleware = (wsActions: TAppActions): Middleware => {
  return ((store: MiddlewareAPI<TAppDispatch, RootState>) => {

    let socket: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;
    let wssUrl: string | null = null;

    return next => (action) => {

        const { dispatch } = store;
        const { wsInit, wsClose, onOpen, onClose, onError, onMessage} = wsActions;
        const token = localStorage.getItem(ACCESS_TOKEN_FIELD);

        if (wsInit.match(action)) {
            if(reconnectTimeout) clearTimeout(reconnectTimeout)
            wssUrl = action.payload;
            const url = wssUrl + (token ? `?token=${token}` : '')
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
                const parsedData = JSON.parse(data);

                if (wssUrl && parsedData.message === "Invalid or missing token") {
                    refreshToken().then(() => {
                        const url = wssUrl + (token ? `?token=${token}` : '')
                        dispatch(wsInit(url));
                    }).catch(() => {
                        dispatch(onError());
                    });
                    
                    dispatch(wsClose());
                    return;
                };

                const { success, ...restParsedData } = parsedData;
                dispatch(onMessage(restParsedData));
            };

            socket.onclose = event => {
                dispatch(onClose());
                if(event.code === 1000){
                    reconnectTimeout = setTimeout(() => {
                        dispatch(wsInit(event.reason));
                    }, 3000);
                }
            };

            if (wsClose.match(action)) {
                if(reconnectTimeout) clearTimeout(reconnectTimeout)
                socket.close();
            }
        }

        next(action);
    };
  }) as Middleware;
};