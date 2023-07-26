import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { TInitialStateResetPassword, TResetPasswordData } from "./types";
import request from "../../../api";
import { TResponseResultMessage } from "../../../api/types";

export const initialState: TInitialStateResetPassword = {data: {
    password: '', token: ''
}, isLoading: false, isFailed: false, isSuccess: false};

export const resetPasswordFetch = createAsyncThunk(
    "resetPassword/resetPasswordFetch",
    async (data: TResetPasswordData) => {
        const result = await request<TResponseResultMessage>('password-reset/reset', 'POST', data);
        return result;
    }
);

const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: initialState,
    reducers: {
        setFields: (state, action: PayloadAction<{key: string, value: string}>) => {
            return {...state, data: {...state.data, [action.payload.key]: action.payload.value}}
        }
    },
    extraReducers: builder => {
        builder
        .addCase(resetPasswordFetch.fulfilled, () => ({
            ...initialState, isSuccess: true
        }))
        .addCase(resetPasswordFetch.pending, state => ({...state, isLoading: true}))
        .addCase(resetPasswordFetch.rejected, (state, action) => ({
            ...state, isLoading: false, isFailed: true, isSuccess: false, error: action.error.message
        }))
    }
});

export const { setFields } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;