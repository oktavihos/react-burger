import  { configureStore } from '@reduxjs/toolkit';

import profileReducer, {
    initialState as profileInitialState,
    setData,
    updateUser,
    getUser,
    reset
} from './index';

import { mockLoginResponseData, userMockData } from '../../../utils/mock-data';
import { ACCESS_TOKEN_FIELD } from '../../../config/api';

const store = configureStore({
    reducer: profileReducer,
    preloadedState: profileInitialState
});

describe('Profile slice test', () => {

    beforeEach(() => {
        localStorage.setItem(ACCESS_TOKEN_FIELD, "test");
    });

    afterEach(() => {
        jest.spyOn(global, "fetch").mockClear();
    });

    it('Should be initial state profile', async () => {
        expect(store.getState()).toEqual(profileInitialState);
    });

    it('Should be fetch get user error', async () => {

        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() => {
                return Promise.reject("test");
            })
        );

        await store.dispatch(getUser());
        const { requests: { getUser: storeGetUser } } = store.getState();

        expect(storeGetUser).toEqual({
            ...profileInitialState.requests.getUser,
            isFailed: true,
            error: "test",
            isGetUserInfo: true
        });
    });

    it('Should be fetch get user', async () => {

        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() => {
                return Promise.resolve({
                    json: () => mockLoginResponseData,
                    ok: true,
                });
            })
        );

        await store.dispatch(getUser());
        expect(fetch).toBeCalledTimes(1);

        const { requests: { getUser: storeGetUser } } = store.getState();

        expect(storeGetUser).toEqual({
            ...profileInitialState.requests.getUser,
            isGetUserInfo: true
        });
    });

    it('Should be fetch update user error', async () => {
        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() => {
                return Promise.reject("test");
            })
        );

        await store.dispatch(updateUser({name: "test"}));
        const { requests: { updateUser: storeUpdateUser } } = store.getState();

        expect(storeUpdateUser).toEqual({
            isFailed: true,
            isLoading: false,
            error: "test"
        });
    });

    it('Should be fetch update user', async () => {
        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() => {
                return Promise.resolve({
                    json: () => mockLoginResponseData,
                    ok: true,
                });
            })
        );

        await store.dispatch(updateUser({name: "test"}));
        const { requests: { updateUser: storeUpdateUser } } = store.getState();

        expect(storeUpdateUser).toEqual({
            isFailed: false,
            isLoading: false,
            error: undefined
        });
    });

    it('Should be set data', () => {
        const setMockUser = {name: userMockData.name, email: userMockData.email};
        store.dispatch(setData(setMockUser));
        const { user } = store.getState();

        expect(user).toEqual(setMockUser);
    });

    it('Should be reset data', () => {
        store.dispatch(reset());

        expect(store.getState()).toEqual({
            ...profileInitialState,
            requests: {
                ...profileInitialState.requests,
                getUser: {
                    ...profileInitialState.requests.getUser,
                    isGetUserInfo: true
                }
            }
        });
    });
});