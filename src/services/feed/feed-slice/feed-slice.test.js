import  { configureStore } from '@reduxjs/toolkit';

import feedReducer, {
    initialState as feedInitialState,
    wsInit,
    wsClose,
    onOpen,
    onClose,
    onError,
    onMessage
} from './index';

import { responseSocketOrders } from '../../../utils/mock-data';

const store = configureStore({
    reducer: feedReducer,
    preloadedState: feedInitialState
});

describe('Feed slice test', () => {
    it('Should be initial state feed', () => {
        expect(store.getState()).toEqual(feedInitialState);
    });

    it('Should be init socket feed', () => {
        store.dispatch(wsInit(""));
        expect(store.getState()).toEqual({
            ...feedInitialState,
            init: true
        })
    });

    it('Should be open socket feed', () => {
        store.dispatch(onOpen());
        expect(store.getState()).toEqual({
            ...feedInitialState,
            init: true,
            open: true
        })
    });

    it('Should be message socket feed', () => {
        store.dispatch(onMessage(responseSocketOrders));
        expect(store.getState()).toEqual({
            ...feedInitialState,
            data: responseSocketOrders,
            init: true,
            open: true,
            isLoading: false
        })
    });

    it('Should be error socket feed', () => {
        store.dispatch(onError("test"));
        expect(store.getState()).toEqual({
            ...feedInitialState,
            data: null,
            init: false,
            open: false,
            isLoading: false,
            error: "test"
        })
    });

    it('Should be ws close socket feed', () => {
        store.dispatch(wsClose());
        expect(store.getState()).toEqual({
            ...feedInitialState,
            data: null,
            init: false,
            open: false
        })
    });

    it('Should be on close socket feed', () => {
        store.dispatch(onClose());
        expect(store.getState()).toEqual(feedInitialState)
    });
});