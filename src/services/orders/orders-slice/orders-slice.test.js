import  { configureStore } from '@reduxjs/toolkit';

import ordersReducer, {
    initialState as ordersInitialState,
    wsInit,
    wsClose,
    onOpen,
    onClose,
    onError,
    onMessage
} from './index';

import { responseSocketOrders } from '../../../utils/mock-data';

const store = configureStore({
    reducer: ordersReducer,
    preloadedState: ordersInitialState
});

describe('Orders slice test', () => {
    it('Should be initial state orders', () => {
        expect(store.getState()).toEqual(ordersInitialState);
    });

    it('Should be init socket orders', () => {
        store.dispatch(wsInit(""));
        expect(store.getState()).toEqual({
            ...ordersInitialState,
            init: true
        })
    });

    it('Should be open socket orders', () => {
        store.dispatch(onOpen());
        expect(store.getState()).toEqual({
            ...ordersInitialState,
            init: true,
            open: true
        })
    });

    it('Should be message socket orders', () => {
        store.dispatch(onMessage(responseSocketOrders));
        expect(store.getState()).toEqual({
            ...ordersInitialState,
            data: responseSocketOrders,
            init: true,
            open: true,
            isLoading: false
        })
    });

    it('Should be error socket orders', () => {
        store.dispatch(onError("test"));
        expect(store.getState()).toEqual({
            ...ordersInitialState,
            data: null,
            init: false,
            open: false,
            isLoading: false,
            error: "test"
        })
    });

    it('Should be ws close socket orders', () => {
        store.dispatch(wsClose());
        expect(store.getState()).toEqual({
            ...ordersInitialState,
            data: null,
            init: false,
            open: false
        })
    });

    it('Should be on close socket orders', () => {
        store.dispatch(onClose());
        expect(store.getState()).toEqual(ordersInitialState)
    });
});