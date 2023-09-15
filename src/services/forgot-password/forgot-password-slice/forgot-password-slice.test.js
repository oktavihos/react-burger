import  { configureStore } from '@reduxjs/toolkit';

import forgotPasswordReducer, {
    initialState as forgotPasswordInitialState,
    forgotPasswordFetch
} from './index';

import { mockLoginResponseData, userMockData } from '../../../utils/mock-data';

const store = configureStore({
    reducer: forgotPasswordReducer,
    preloadedState: forgotPasswordInitialState
});

describe('Forgot password slice test', () => {

    afterEach(() => {
        jest.spyOn(global, "fetch").mockClear();
    });

    it('Should be initial state forgot password', async () => {
        expect(store.getState()).toEqual(forgotPasswordInitialState);
    });

    it('Should be fetch forgot password', async () => {

        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() => {
                return Promise.resolve({
                    json: () => mockLoginResponseData,
                    ok: true,
                });
            })
        );

        await store.dispatch(forgotPasswordFetch({email: userMockData.email}));
        expect(fetch).toBeCalledTimes(1);
        expect(store.getState()).toEqual({
            ...forgotPasswordInitialState,
            isSuccess: true
        });
    });

    it('Should be fetch forgot password error', async () => {

        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() => {
                return Promise.reject("test");
            })
        );

        await store.dispatch(forgotPasswordFetch({email: userMockData.email}));
        expect(fetch).toBeCalledTimes(1);
        expect(store.getState()).toEqual({
            ...forgotPasswordInitialState,
            isSuccess: false,
            isFailed: true,
            error: "test"
        });
    });
});