import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUserData, TInitialStateLogin } from "../types";
import request from "../../../api";
import { TResponseResultMessage } from "../../../api/types";
import { TProfileResponse } from "../../profile/types";
import { setData, reset } from "../../profile/profile-slice";
import { ACCESS_TOKEN_FIELD, REFRESH_TOKEN_FIELD } from "../../../config/api";

const InitialStateThunk = {
    isLoading: false, 
    isFailed: false,
    error: undefined
};

export const initialState: TInitialStateLogin = {
    login: InitialStateThunk,
    logout: InitialStateThunk
};

export const loginFetch = createAsyncThunk(
    "auth/loginFetch",
    async (data: TUserData, { dispatch }) => {
        const result = await request<TProfileResponse>('auth/login', 'POST', data);

        const accessToken = result.accessToken.split('Bearer ')[1];
        const refreshToken = result.refreshToken;

        localStorage.setItem(ACCESS_TOKEN_FIELD, accessToken);
        localStorage.setItem(REFRESH_TOKEN_FIELD, refreshToken);

        dispatch(setData(result.user));
        return result.user;
    }
);

export const logoutFetch = createAsyncThunk(
    "auth/logoutFetch",
    async (_, { dispatch }) => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_FIELD);
        const result = await request<TResponseResultMessage>('auth/logout', 'POST', {token: refreshToken});
        localStorage.removeItem(ACCESS_TOKEN_FIELD);
        localStorage.removeItem(REFRESH_TOKEN_FIELD);
        dispatch(reset());
        return result;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(loginFetch.fulfilled, state => ({
            ...state, login: {...initialState.login, isSuccess: true}
        }))
        .addCase(loginFetch.pending, state => ({
            ...state, login: {...state.login, isLoading: true}
        }))
        .addCase(loginFetch.rejected, (state, action) => ({
            ...state, login: {
                ...state.login, isLoading: false, isFailed: true, error: action.error.message
            }
        }))

        .addCase(logoutFetch.fulfilled, state => ({
            ...state, logout: {...initialState.logout, isSuccess: true}
        }))
        .addCase(logoutFetch.pending, state => ({
            ...state, logout: {...state.logout, isLoading: true}
        }))
        .addCase(logoutFetch.rejected, (state, action) => ({
            ...state, logout: {
                ...state.logout, isLoading: false, isFailed: true, error: action.error.message
            }
        }))
    }
});

export default authSlice.reducer;