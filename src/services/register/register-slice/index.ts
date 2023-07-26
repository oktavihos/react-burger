import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { TInitialStateRegister, TRegisterData } from "./types";
import request from "../../../api";
import { TProfileResponse } from "../../profile/profile-slice/types";
import { setData } from "../../profile/profile-slice";

export const initialState: TInitialStateRegister = {data: {
    name: '', email: '', password: ''
}, isLoading: false, isFailed: false, isSuccess: false};

export const registerFetch = createAsyncThunk(
    "register/registerFetch",
    async (data: TRegisterData, { dispatch }) => {
        const result = await request<TProfileResponse>('auth/register', 'POST', data);
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        dispatch(setData(result.user));
        return result.user;
    }
);

const registerSlice = createSlice({
    name: 'register',
    initialState: initialState,
    reducers: {
        setFields: (state, action: PayloadAction<{key: string, value: string}>) => {
            return {...state, data: {...state.data, [action.payload.key]: action.payload.value}}
        }
    },
    extraReducers: builder => {
        builder
        .addCase(registerFetch.fulfilled, () => ({
            ...initialState, isSuccess: true
        }))
        .addCase(registerFetch.pending, state => ({...state, isLoading: true}))
        .addCase(registerFetch.rejected, (state, action) => ({
            ...state, isLoading: false, isSuccess: false, isFailed: true, error: action.error.message
        }))
    }
});

export const { setFields } = registerSlice.actions;

export default registerSlice.reducer;