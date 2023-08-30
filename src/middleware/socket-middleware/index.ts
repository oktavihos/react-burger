import type { Middleware, MiddlewareAPI } from 'redux';

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

        if (wsInit.match(action)) {
            if(reconnectTimeout) clearTimeout(reconnectTimeout)
            wssUrl = action.payload;
            socket = new WebSocket(wssUrl);
        }
        if (socket) {
            socket.onopen = () => {
                dispatch(onOpen());
            };

            socket.onerror = () => {
                dispatch(onError("Произошла ошибка во время соединения"));
            };

            socket.onmessage = event => {
                const { data } = event;
                const parsedData = JSON.parse(data);

                if (wssUrl && parsedData.message === "Invalid or missing token") {
                    refreshToken().then(() => {
                        if(wssUrl) dispatch(wsInit(wssUrl));
                    }).catch(() => {
                        dispatch(onError("Произошла ошибка обновления токена"));
                    });
                    
                    dispatch(wsClose());
                    return;
                };

                const { success, ...restParsedData } = parsedData;
                dispatch(onMessage(restParsedData));
            };

            socket.onclose = event => {
                if(event.code === 1000 && wssUrl){
                    reconnectTimeout = setTimeout(() => {
                        if(wssUrl) dispatch(wsInit(wssUrl));
                    }, 3000);
                }else{
                    dispatch(onClose());
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