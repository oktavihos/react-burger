import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { TUserData, TInitialStateLogin } from "./types";
import request from "../../../api";
import { TResponseResultMessage } from "../../../api/types";
import { TProfileResponse } from "../../profile/profile-slice/types";
import { setData } from "../../profile/profile-slice";

const InitialStateThunk = {
    isLoading: false, 
    isFailed: false,
    error: undefined
};

export const initialState: TInitialStateLogin = {
    login: {...InitialStateThunk, data: {email: '', password: ''}},
    logout: InitialStateThunk
};

export const loginFetch = createAsyncThunk(
    "auth/loginFetch",
    async (data: TUserData, { dispatch }) => {
        const result = await request<TProfileResponse>('auth/login', 'POST', data);
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        dispatch(setData(result.user));
        return result.user;
    }
);

export const logoutFetch = createAsyncThunk(
    "auth/logoutFetch",
    async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        const result = await request<TResponseResultMessage>('auth/logout', 'POST', {token: refreshToken});
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return result;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setFields: (state, action: PayloadAction<{key: string, value: string}>) => {
            return {...state, login: {
                ...state.login, data: {
                    ...state.login.data, [action.payload.key]: action.payload.value
                }
            }}
        }
    },
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

export const { setFields } = authSlice.actions;

export default authSlice.reducer;