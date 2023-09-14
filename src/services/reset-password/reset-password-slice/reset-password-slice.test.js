import  { configureStore } from '@reduxjs/toolkit';

import resetPasswordReducer, {
    initialState as resetPasswordInitialState,
    resetPasswordFetch
} from './index';

import { mockLoginResponseData, userMockData } from '../../../utils/mock-data';

const store = configureStore({
    reducer: resetPasswordReducer,
    preloadedState: resetPasswordInitialState
});

describe('Reset password slice test', () => {

    afterEach(() => {
        jest.spyOn(global, "fetch").mockClear();
    });

    it('Should be initial state reset password', async () => {
        expect(store.getState()).toEqual(resetPasswordInitialState);
    });

    it('Should be fetch reset password', async () => {

        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() => {
                return Promise.resolve({
                    json: () => mockLoginResponseData,
                    ok: true,
                });
            })
        );

        await store.dispatch(resetPasswordFetch({password: userMockData.password, token: "test"}));
        expect(fetch).toBeCalledTimes(1);
        expect(store.getState()).toEqual({
            ...resetPasswordInitialState,
            isSuccess: true
        });
    });

    it('Should be fetch reset password error', async () => {

        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() => {
                return Promise.reject("test");
            })
        );

        await store.dispatch(resetPasswordFetch({password: userMockData.password, token: "test"}));
        expect(fetch).toBeCalledTimes(1);
        expect(store.getState()).toEqual({
            ...resetPasswordInitialState,
            isSuccess: false,
            isFailed: true,
            error: "test"
        });
    });
});