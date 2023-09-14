import  { configureStore } from '@reduxjs/toolkit';

import registerReducer, {
    initialState as registerInitialState,
    registerFetch
} from './index';

import { mockLoginResponseData, userMockData } from '../../../utils/mock-data';

const store = configureStore({
    reducer: registerReducer,
    preloadedState: registerInitialState
});

describe('Register slice test', () => {

    afterEach(() => {
        jest.spyOn(global, "fetch").mockClear();
    });

    it('Should be initial state register slice', async () => {
        expect(store.getState()).toEqual(registerInitialState);
    });

    it('Should be fetch register', async () => {

        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() => {
                return Promise.resolve({
                    json: () => mockLoginResponseData,
                    ok: true,
                });
            })
        );

        await store.dispatch(registerFetch({email: userMockData.email, password: userMockData.password}));
        expect(fetch).toBeCalledTimes(1);
        expect(store.getState()).toEqual({
            ...registerInitialState,
            isSuccess: true
        });
    });

    it('Should be fetch register error', async () => {

        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() => {
                return Promise.reject("test");
            })
        );

        await store.dispatch(registerFetch({email: userMockData.email, password: userMockData.password}));
        
        expect(store.getState()).toEqual({
            ...registerInitialState,
            isSuccess: false,
            isFailed: true,
            error: "test"
        });
    });
});