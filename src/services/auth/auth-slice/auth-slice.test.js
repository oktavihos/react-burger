import  { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer, {
    initialState as authInitialState,
    loginFetch,
    logoutFetch

} from './index';
import profileReducer, { initialState as profileInitialState } from '../../profile/profile-slice'
import { mockLoginResponseData, mockLoginData } from '../../../utils/mock-data';

const currentInitialState = {
    auth: authInitialState,
    profile: profileInitialState
};

const store = configureStore({
    reducer: combineReducers({
        auth: authReducer,
        profile: profileReducer,
    }),

    preloadedState: currentInitialState
});

describe('Auth slice test', () => {

    afterEach(() => {
        jest.spyOn(global, "fetch").mockClear();
    });

    it('Should be return initial state auth', () => {
        expect(store.getState()).toEqual(currentInitialState);
    });

    it("Should be login application", async () => {

        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() => {
                return Promise.resolve({
                    json: () => mockLoginResponseData,
                    ok: true,
                });
            })
        );

        await store.dispatch(loginFetch(mockLoginData));
        expect(fetch).toBeCalledTimes(1);

        expect(store.getState()).toEqual({
            ...currentInitialState,
            auth: {
                ...currentInitialState.auth,
                login: {...currentInitialState.auth.login, isSuccess: true}
            },
            profile: {...currentInitialState.profile, user: mockLoginResponseData.user, isAuth: true}
        });
    });

    it("Should be logout application", async () => {

        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() => {
                return Promise.resolve({
                    json: () => ({success: true, data: null}),
                    ok: true,
                });
            })
        );

        await store.dispatch(logoutFetch(""));
        expect(fetch).toBeCalledTimes(1);

        expect(store.getState()).toEqual({
            ...currentInitialState,
            auth: {
                ...currentInitialState.auth,
                logout: {...currentInitialState.auth.logout, isSuccess: true},
                login: {...currentInitialState.auth.login, isSuccess: true}
            },
        });
    });
});